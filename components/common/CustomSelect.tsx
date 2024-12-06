// components/CustomSelect.tsx

import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

export interface OptionType {
    value: string;
    label: string;
}

interface CustomSelectProps<
    Option extends OptionType,
    IsMulti extends boolean = false
> extends SelectProps<Option, IsMulti> {
    label: string;
}

const CustomSelect = <
    Option extends OptionType,
    IsMulti extends boolean = false
>({
    label,
    isMulti,
    ...props
}: CustomSelectProps<Option, IsMulti>) => {
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#F1F3F5',
            borderColor: state.isFocused ? '#0070F3' : '#F1F3F5',
            borderWidth: '1px',
            borderRadius: '12px',
            minHeight: '3rem',
            boxShadow: state.isFocused ? '0 0 0 1px #0070F3' : 'none',
            '&:hover': {
                borderColor: '#0070F3',
            },
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#A3A3A3',
            fontSize: '1rem',
        }),
        input: (provided: any) => ({
            ...provided,
            color: '#000000',
            fontSize: '1rem',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#000000',
            fontSize: '1rem',
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: '#E4E7EB',
            borderRadius: '0.375rem',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: '#000000',
            fontSize: '1rem',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: '#A3A3A3',
            ':hover': {
                backgroundColor: '#D9DBDE',
                color: '#000000',
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem',
            marginTop: '0.25rem',
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#0070F3'
                : state.isFocused
                    ? '#E4E7EB'
                    : '#FFFFFF',
            color: state.isSelected ? '#FFFFFF' : '#000000',
            cursor: 'pointer',
            fontSize: '1rem',
            ':active': {
                backgroundColor: state.isSelected ? '#0070F3' : '#D9DBDE',
            },
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            color: state.isFocused ? '#0070F3' : '#A3A3A3',
            '&:hover': {
                color: '#0070F3',
            },
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            color: '#A3A3A3',
            padding: '0px',
            '&:hover': {
                color: '#0070F3',
            },
        }),
        menuList: (provided: any) => ({
            ...provided,
            paddingTop: '0',
            paddingBottom: '0',
        }),
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Select<Option, IsMulti>
                styles={customStyles}
                isMulti={isMulti}
                {...props}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#E0F2FF',
                        primary: '#0070F3',
                    },
                })}
            />
        </div>
    );
};

export default CustomSelect;
