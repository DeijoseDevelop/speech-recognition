import { UsersRepository } from "@/data/repositories/r_users";
import { User } from "@/entities/user";
import { create } from "zustand";
export interface UseUsersInterface {
    // Estado
    internalUsers: User[];
    externalUsers: User[];
    hasError: boolean;
    errorMessage: string;

    getHasError(): boolean;
    getErrorMessage(): string;

    // Acciones
    fetchUsers: (isInternal: boolean) => Promise<User[]>;
    createUser: (userData: FormData, isInternal: boolean) => Promise<void>;
    updateUser: (userId: number, userData: FormData) => Promise<void>;
    deleteUser: (userId: number) => Promise<void>;
}

export const useUsers = create<UseUsersInterface>((set, get) => ({
    internalUsers: [],
    externalUsers: [],
    hasError: false,
    errorMessage: "",

    getHasError: () => get().hasError,
    getErrorMessage: () => get().errorMessage,

    fetchUsers: async (isInternal: boolean) => {
        const repository = new UsersRepository();

        const response: Response = await repository.getUsers(isInternal);
        const { users }: { users: User[] } = await response.json();

        isInternal ? set({ internalUsers: users }) : set({ externalUsers: users })
        return users;
    },
    createUser: async (userData: FormData, isInternal: boolean) => {
        set({ hasError: false, errorMessage: "" });
        const repository = new UsersRepository();

        const response = await repository.createUser({ userData, isInternal });
        const json: any = await response.json();

        if (response.status === 201) {
            set({ hasError: false, errorMessage: "" });
            return;
        } else {
            set({ hasError: true, errorMessage: json.message || json.error });
            throw new Error(json.message || json.error);
        }
    },
    updateUser: async (userId: number, userData: FormData) => {
        set({ hasError: false, errorMessage: "" });
        const repository = new UsersRepository();

        const response = await repository.updateUser({ userId, userData });
        const json: any = await response.json();

        if (response.status === 201) {
            set({ hasError: false, errorMessage: "" });
            return;
        } else {
            set({ hasError: true, errorMessage: json.message || json.error });
            throw new Error(json.message || json.error);
        }
    },
    deleteUser: async (userId: number) => {
        set({ hasError: false, errorMessage: "" });
        const repository = new UsersRepository();

        const response = await repository.deleteUser({ userId });
        const json: { message: string } = await response.json();

        if (response.status === 204) {
            set({ hasError: false, errorMessage: "" });
            return;
        } else {
            set({ hasError: true, errorMessage: json.message });
            throw new Error(json.message);
        }
    },
}));