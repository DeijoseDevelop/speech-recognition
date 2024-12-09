import React from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import InternalUsersTable from './InternalUsersTable';

const DirectoryInternalUsers = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4 h-screen overflow-y-auto pb-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h1 className="text-2xl font-bold mb-2 sm:mb-0">Directorio de usuarios internos</h1>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onPress={() => router.replace(ROUTES.internalForm)}
                        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
                    >
                        + Nuevo usuario
                    </Button>
                </div>
            </div>
            <div
                className="p-4"
                style={{
                    border: '1px solid #eaeaea',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
            >
                <InternalUsersTable />
            </div>
        </div>
    );
};

export default DirectoryInternalUsers;

