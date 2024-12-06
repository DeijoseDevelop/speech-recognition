'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { FaChevronDown } from "react-icons/fa6"

export interface Option {
    ID: string;
    Name: string;
}

export interface FilterableSelectProps {
    label: string;
    options: Option[];
    name: string;
    control: any;
    placeholder?: string;
    defaultValue?: string;
    disabled?: boolean;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
    label,
    options,
    name,
    control,
    placeholder = "Seleccionar opción",
    defaultValue,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const lowercasedFilter = filter.toLowerCase()
        const filtered = options.filter(option =>
            option.Name.toLowerCase().includes(lowercasedFilter)
        )
        setFilteredOptions(filtered)
    }, [filter, options])

    // Nuevo useEffect para sincronizar defaultValue con el estado interno y el valor del formulario
    useEffect(() => {
        if (defaultValue && options.length > 0) {
            const defaultOption = options.find(option => option.ID === defaultValue)
            if (defaultOption) {
                setFilter(defaultOption.Name)
                // Actualizar el valor del formulario
                if (control && control.setValue) {
                    control.setValue(name, defaultOption.ID)
                }
            } else {
                setFilter('')
                if (control && control.setValue) {
                    control.setValue(name, '')
                }
            }
        } else {
            setFilter('')
            if (control && control.setValue) {
                control.setValue(name, '')
            }
        }
    }, [defaultValue, options, control, name])

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <div className="relative mb-4" ref={selectRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <div
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-default-100 border border-default-200 rounded-xl cursor-text ${isOpen ? 'ring-2 ring-primary' : 'hover:bg-default-200'}`}
                        onClick={() => !disabled && setIsOpen(true)}
                    >
                        <input
                            type="text"
                            className="cursor-pointer py-3 w-full bg-transparent border-none focus:ring-0 focus:outline-none placeholder-default-400"
                            placeholder={placeholder}
                            value={filter}
                            disabled={disabled}
                            onChange={(e) => {
                                setFilter(e.target.value)
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                        <div className="flex items-center pointer-events-none">
                            <FaChevronDown className={`cursor-pointer w-3 h-3 text-default-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {isOpen && (
                        <ul className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-white border border-default-200 rounded-lg shadow-lg">
                            {filteredOptions.map((option) => (
                                <li
                                    key={option.ID}
                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-default-100"
                                    onClick={() => {
                                        field.onChange(option.ID)
                                        setFilter(option.Name)
                                        setIsOpen(false)
                                    }}
                                >
                                    {option.Name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        />
    )
}

export default FilterableSelect
