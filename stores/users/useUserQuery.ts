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
                console.log(data);
                useUsers.setState({ internalUsers: data });
            },
            onError: (error) => {
                useUsers.setState({ error: error.message });
            },
        }
    );
    console.log(queryInternal.data);

    // const queryExternal = useQuery<User[], Error>(
    //     ['external_users'],
    //     () => fetchUsers(false),
    //     {
    //         onSuccess: (data) => {
    //             useUsers.setState({ externalUsers: data });
    //         },
    //         onError: (error) => {
    //             useUsers.setState({ error: error.message });
    //         },
    //     }
    // );

    // const mutation = useMutation(
    //     (advisor: Employee) => createOrUpdateAdvisor(advisor),
    //     {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(['advisors']);
    //         }
    //     }
    // );

    // return { ...query, advisors: query.data, createOrUpdateAdvisor: mutation.mutateAsync };
    return {
        ...queryInternal,
        // ...queryExternal,
        internalUsers: queryInternal.data,
        // externalUsers: queryExternal.data,
    };
};

export default useUserQuery;