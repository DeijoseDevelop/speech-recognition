"use client";

import Loading from '@/components/common/Loading';
import InternalUserForm from '@/components/internal/form/InternalUserForm';
import useAuthHook from '@/hooks/useAuthHook';
import React from 'react';

const InternalUserFormPage = () => {
    const { loading } = useAuthHook();

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <InternalUserForm />
        </>
    );
};

export default InternalUserFormPage;