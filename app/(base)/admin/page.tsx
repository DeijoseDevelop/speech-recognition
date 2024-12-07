"use client";

import { signOut } from 'next-auth/react';

import Loading from '@/components/common/Loading';
import useAuthHook from '@/hooks/useAuthHook';
import { Button } from '@nextui-org/react';

const AdminHomePage = () => {
    const { loading } = useAuthHook();

    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <p className="text-black">Home</p>
            {/* <Button onClick={() => signOut({ redirect: false })}>LOGOUT</Button> */}
        </div>
    );
};

export default AdminHomePage;