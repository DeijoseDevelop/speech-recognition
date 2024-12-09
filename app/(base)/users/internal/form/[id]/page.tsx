"use client";

import Loading from '@/components/common/Loading';
import InternalUserForm from '@/components/internal/form/InternalUserForm';
import { User } from '@/entities/user';
import useAuthHook from '@/hooks/useAuthHook';
import useUserQuery from '@/stores/users/useUserQuery';
import { useParams } from 'next/navigation';
import React from 'react';

const InternalUserDetailFormPage = () => {
    const { loading } = useAuthHook();
    const { id } = useParams();
    const { internalUsers } = useUserQuery();

    if (loading) {
        return <Loading />
    }

    let userToEdit: User | undefined = undefined;
    if (id) {
        const userId = parseInt(id as string, 10);
        userToEdit = internalUsers?.find(u => u.id === userId);
    }

    return (
        <>
            <InternalUserForm user={userToEdit} />
        </>
    );
};

export default InternalUserDetailFormPage;