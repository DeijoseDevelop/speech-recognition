"use client";

import Loading from '@/components/common/Loading';
import ExternalUserForm from '@/components/external/form/ExternalUserForm';
import useAuthHook from '@/hooks/useAuthHook';
import React from 'react';

const ExternalUserFormPage = () => {
    const { loading } = useAuthHook();

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <ExternalUserForm />
        </>
    );
};

export default ExternalUserFormPage;