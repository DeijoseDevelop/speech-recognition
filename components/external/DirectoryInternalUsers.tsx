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
                <h1 className="text-2xl font-bold mb-2 sm:mb-0">Directorio de asesores</h1>
                <div className="flex gap-2">
                    <Button onPress={() => {}} className="bg-brandBlue text-white">+ Nuevo asesor</Button>
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

