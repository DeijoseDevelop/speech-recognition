"use client";

import Loading from '@/components/common/Loading';
import DirectoryExternalUsers from '@/components/external/DirectoryExternalUsers';
import useAuthHook from '@/hooks/useAuthHook';
import React from 'react';

const ExternalUsersPage = () => {
    const { loading } = useAuthHook();

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <DirectoryExternalUsers />
        </>
    );
};

export default ExternalUsersPage;