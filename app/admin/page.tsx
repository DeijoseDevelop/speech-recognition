"use client";

import Loading from '@/components/common/Loading';
import useAuthHook from '@/hooks/useAuthHook';

const AdminHomePage = () => {
    const { loading } = useAuthHook();

if (loading) {
    return <Loading />;
}
    return (
        <div>
            Home
        </div>
    );
};

export default AdminHomePage;