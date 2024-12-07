"use client";

import Sidebar, { MenuItem } from "@/components/common/Sidebar";
import { FaHome, FaUsers } from 'react-icons/fa';
import { Button } from "@nextui-org/react";
import { ROUTES } from '@/config/routes';
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/useAuth";


const menuItems: MenuItem[] = [
    {
        title: 'Inicio',
        icon: <FaHome className="text-2xl" />,
        subRoutes: [
            { title: 'Dashboard', path: ROUTES.admin },
        ],
    },
    {
        title: 'Usuarios',
        icon: <FaUsers />,
        subRoutes: [
            { title: 'Usuarios internos', path: ROUTES.internal },
            { title: 'Usuarios externos', path: ROUTES.extenal },
        ],
    },
    // {
    //   title: 'Clientes',
    //   icon: <RiUserSearchFill className="text-2xl" />,
    //   subRoutes: [
    //     { title: 'Directorio de clientes', path: ROUTES.clients.index },
    //     { title: 'Nuevo cliente', path: ROUTES.clients.form },
    //   ],
    // },
    // {
    //   title: 'Asesores',
    //   icon: <FaUsers className="text-2xl" />,
    //   subRoutes: [
    //     { title: 'Directorio de asesores', path: ROUTES.advisors.index },
    //     { title: 'Nuevo asesor', path: ROUTES.advisors.form },
    //   ],
    // },
    // {
    //   title: 'Inmuebles',
    //   icon: <FaBuilding className="text-2xl" />,
    //   subRoutes: [
    //     { title: 'Listado de Inmuebles', path: ROUTES.properties.index },
    //     // { title: 'Nuevo Inmueble', path: ROUTES.properties.newProperty },// { title: 'Reportes', path: ROUTES.properties.reports },
    //   ],
    // },
    // {
    //   title: 'Roles',
    //   icon: <FaUserTie className="text-2xl" />,
    //   subRoutes: [
    //     { title: 'Listado de Roles', path: ROUTES.roles.index },
    //     // { title: 'Nuevo Inmueble', path: ROUTES.properties.newProperty },// { title: 'Reportes', path: ROUTES.properties.reports },
    //   ],
    // },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        await signOut({ redirect: false });
        router.replace(ROUTES.login);
    };
    return (
        <main className="h-screen" style={{ overflowY: "hidden" }}>
            <section className="flex justify-between items-center px-5 w-full h-16 bg-gray-200">
                {/* <Logo src="https://unicolombo.edu.co/wp-content/uploads/2023/05/Logo-Unicolombo-2048x547.png" width={250} /> */}
                <button onClick={() => router.replace(ROUTES.admin)} className="text-black">HOME</button>
                <Button color="danger" onPress={handleLogout}>Cerrar Sesión</Button>
            </section>
            <section className="flex">
                <Sidebar menuItems={menuItems} />
                <div className="p-1 md:p-4 w-full">
                    {children}
                </div>
            </section>
        </main>
    )
}
