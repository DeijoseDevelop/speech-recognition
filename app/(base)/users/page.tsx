"use client";

import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const UsersPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace(ROUTES.home);
    }, [router])

    return (
        <></>
    );
};

export default UsersPage;