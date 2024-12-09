import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    SortDescriptor,
    Select,
    SelectItem,
    User,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import Loading from "../common/Loading";
import useDebounce from "@/hooks/useDebounce";
import { useMutation, useQueryClient } from "react-query";
import { SwalAlert } from "@/utils/alert";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useUsers } from "@/stores/users/useUsers";
import useUserQuery from "@/stores/users/useUserQuery";
import * as userEntities from "@/entities/user";

const INITIAL_VISIBLE_COLUMNS = ["Name", "email", "Status", "BusinessUnit", "actions"];
const columns = [
    { name: "NAME", uid: "Name", sortable: true },
    { name: "EMAIL", uid: "email" },
    { name: "ACTIONS", uid: "actions" },
];

export default function ExternalUsersTable() {
    const router = useRouter();
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState<number | 'all'>(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const debouncedSearch = useDebounce<string>(filterValue, 500);

    const { deleteUser } = useUsers(); // Importamos la acción deleteUser
    const { externalUsers, isLoading } = useUserQuery();

    const queryClient = useQueryClient();

    // Mutación para eliminar el usuario
    const deleteMutation = useMutation(
        async (userId: number) => {
            await deleteUser(userId);
        },
        {
            onSuccess: () => {
                SwalAlert.showAlert({ icon: "success", title: "Usuario eliminado correctamente" });
                queryClient.invalidateQueries("external_users");
            },
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    console.error(error);
                    SwalAlert.showAlert({ icon: "error", title: error.message });
                }
            },
        }
    );

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = externalUsers ? [...externalUsers] : [];

        if (debouncedSearch.trim().length > 0) {
            const lowerFilter = debouncedSearch.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                (user.name?.toLowerCase().includes(lowerFilter) ||
                user.last_name?.toLowerCase().includes(lowerFilter) ||
                user.email?.toLowerCase().includes(lowerFilter) ||
                user.document_number?.toString().toLowerCase().includes(lowerFilter))
            );
        }

        return filteredUsers;
    }, [externalUsers, debouncedSearch]);

    const totalItems = filteredItems.length;

    const sortedAndPaginatedItems = React.useMemo(() => {
        const sorted = [...filteredItems].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof userEntities.User] as string | number;
            const second = b[sortDescriptor.column as keyof userEntities.User] as string | number;

            let cmp = 0;
            if (typeof first === 'number' && typeof second === 'number') {
                cmp = first < second ? -1 : first > second ? 1 : 0;
            } else {
                const f = String(first).toLowerCase();
                const s = String(second).toLowerCase();
                cmp = f < s ? -1 : f > s ? 1 : 0;
            }

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });

        if (rowsPerPage === 'all') return sorted;

        const startIndex = (page - 1) * (rowsPerPage as number);
        const endIndex = startIndex + (rowsPerPage as number);
        return sorted.slice(startIndex, endIndex);
    }, [sortDescriptor, filteredItems, page, rowsPerPage]);

    const pages = rowsPerPage === 'all' ? 1 : Math.ceil(totalItems / (rowsPerPage as number));

    const handleDelete = async (userId: number) => {
        const result = await SwalAlert.showOptionAlert({
            icon: "warning",
            title: "¿Estás seguro de eliminar este usuario?",
            confirmButtonText: "Sí, eliminar"
        });
        if (result.isConfirmed) {
            deleteMutation.mutate(userId);
        }
    };

    const renderCell = React.useCallback((user: userEntities.User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof userEntities.User];

        switch (columnKey) {
            case "Name":
                return (
                    <div className="text-black">
                        <User
                            name={`${user.name} ${user.last_name}`}
                            description={user.email}
                        >
                            {user.name} {user.last_name}
                        </User>
                    </div>
                );
            case "email":
                return <p className="text-black">{user.email}</p>;
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="Editar"
                                    value="Editar"
                                    onClick={() => router.push(`${ROUTES.externalForm}/${user.id}`)}
                                >
                                    Editar
                                </DropdownItem>
                                <DropdownItem
                                    key="Eliminar"
                                    value="Eliminar"
                                    color="danger"
                                    onClick={() => handleDelete(user.id!)}
                                >
                                    Eliminar
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return String(cellValue ?? "");
        }
    }, [handleDelete, router]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setRowsPerPage(value === 'all' ? 'all' : Number(value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar"
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {totalItems} usuarios</span>
                    <Select
                        size="sm"
                        label="Usuarios por página"
                        className="w-3/5 sm:max-w-44"
                        onChange={(e) => {
                            const value = e.target.value;
                            setRowsPerPage(value === "all" ? "all" : Number(value));
                            setPage(1);
                        }}
                    >
                        <SelectItem key={1} value={1}>1</SelectItem>
                        <SelectItem key={5} value={5}>5</SelectItem>
                        <SelectItem key={10} value={10}>10</SelectItem>
                        <SelectItem key={50} value={50}>50</SelectItem>
                        <SelectItem key={"all"} value="all">Todos</SelectItem>
                    </Select>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        visibleColumns,
        onRowsPerPageChange,
        totalItems,
        onClear,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400"></span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Anterior
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Siguiente
                    </Button>
                </div>
            </div>
        );
    }, [
        selectedKeys,
        filteredItems.length,
        page,
        pages,
        onPreviousPage,
        onNextPage,
    ]);

    if (isLoading) return <Loading />;

    return (
        <Table
            aria-label="Tabla de usuarios"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No hay usuarios"} items={sortedAndPaginatedItems}>
                {(item) => (
                    <TableRow key={item.id!}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
