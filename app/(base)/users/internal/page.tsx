"use client";

import Loading from '@/components/common/Loading';
import DirectoryInternalUsers from '@/components/external/DirectoryInternalUsers';
import useAuthHook from '@/hooks/useAuthHook';

const InternalUsersPage = () => {
    const { loading } = useAuthHook();

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <DirectoryInternalUsers />
        </>
    );
};

export default InternalUsersPage;