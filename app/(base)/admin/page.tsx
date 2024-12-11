"use client";

import { signOut } from "next-auth/react";
import Loading from "@/components/common/Loading";
import useAuthHook from "@/hooks/useAuthHook";
import { Button } from "@nextui-org/react";
import DownloadReportButton from "@/components/download/DownloadReportButton";
import Charts from "@/components/charts/Charts";

const AdminHomePage = () => {
    const { loading } = useAuthHook();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard de Administración</h1>
                <DownloadReportButton />
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
                <p className="text-gray-700 mb-4">Bienvenido al panel de administración.</p>

                {/* Render Charts Component */}
                <Charts />
            </div>
        </div>
    );
};

export default AdminHomePage;