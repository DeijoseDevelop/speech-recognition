import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUsers } from "./useUsers";
import { User } from "@/entities/user";

// const useUserQuery = (name?: string, page?: number, pageSize?: number) => {
    const useUserQuery = () => {
    const { fetchUsers } = useUsers();
    const queryClient = useQueryClient();

    const queryInternal = useQuery<User[], Error>(
        ['internal_users'],
        () => fetchUsers(true),
        {
            onSuccess: (data) => {
                useUsers.setState({ internalUsers: data, errorMessage: "", hasError: false });
            },
            onError: (error) => {
                useUsers.setState({ errorMessage: error.message, hasError: true });
            },
        }
    );
    const queryExternal = useQuery<User[], Error>(
        ['external_users'],
        () => fetchUsers(false),
        {
            onSuccess: (data) => {
                useUsers.setState({ externalUsers: data, errorMessage: "", hasError: false });
            },
            onError: (error) => {
                useUsers.setState({ errorMessage: error.message, hasError: true });
            },
        }
    );

    return {
        ...queryInternal,
        ...queryExternal,
        internalUsers: queryInternal.data,
        externalUsers: queryExternal.data,
    };
};

export default useUserQuery;