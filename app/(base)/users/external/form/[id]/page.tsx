"use client";

import Loading from '@/components/common/Loading';
import ExternalUserForm from '@/components/external/form/ExternalUserForm';
import { User } from '@/entities/user';
import useAuthHook from '@/hooks/useAuthHook';
import useUserQuery from '@/stores/users/useUserQuery';
import { useParams } from 'next/navigation';
import React from 'react';

const ExternalUserDetailFormPage = () => {
    const { loading } = useAuthHook();
    const { id } = useParams();
    const { externalUsers } = useUserQuery();

    if (loading) {
        return <Loading />
    }

    let userToEdit: User | undefined = undefined;
    if (id) {
        const userId = parseInt(id as string, 10);
        userToEdit = externalUsers?.find(u => u.id === userId);
    }

    return (
        <>
            <ExternalUserForm user={userToEdit} />
        </>
    );
};

export default ExternalUserDetailFormPage;