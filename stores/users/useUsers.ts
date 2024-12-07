import { UsersRepository } from "@/data/repositories/r_users";
import { User } from "@/entities/user";
import { create } from "zustand";

export const useUsers = create<any>((set, get) => ({
    internalUsers: [],
    externalUsers: [],

    fetchUsers: async (isInternal: boolean) => {
        const repository = new UsersRepository();

        const response: Response = await repository.getUsers(isInternal);
        // console.log(response);
        const { users }: { users: User[] } = await response.json();
        console.log(users);

        isInternal ? set({ internalUsers: users }) : set({ externalUsers: users })
        return users;
    },
}));