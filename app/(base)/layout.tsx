"use client";

import Sidebar, { MenuItem } from "@/components/common/Sidebar";
import { FaHome, FaUsers } from 'react-icons/fa';
import { Button } from "@nextui-org/react";
import { ROUTES } from '@/config/routes';
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/useAuth";
import { ColomboLogo, UnicolomboLogo } from "@/utils/images";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";

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
            { title: 'Usuarios externos', path: ROUTES.external },
        ],
    },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { logout } = useAuth();
    const { isMobile } = useResponsive();

    const handleLogout = async () => {
        await logout();
        await signOut({ redirect: false });
        router.replace(ROUTES.login);
    };

    return (
        <main className="h-screen overflow-hidden">
            <section className="flex justify-between items-center px-5 w-full h-16 bg-gray-200">
                <div className="flex h-16 items-center">
                    {
                        !isMobile && <div className="relative h-full w-40">
                            <Image
                                src={ColomboLogo.src}
                                alt="Colombo Logo"
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>
                    }
                    <div className="relative h-32 w-40">
                        <Image
                            src={UnicolomboLogo.src}
                            alt="Unicolombo Logo"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </div>
                <Button color="danger" onPress={handleLogout}>Cerrar Sesión</Button>
            </section>
            <section className="flex h-[calc(100%-4rem)] overflow-y-auto">
                <Sidebar menuItems={menuItems} />
                <div className="p-1 md:p-4 w-full">
                    {children}
                </div>
            </section>
        </main>
    );
}
