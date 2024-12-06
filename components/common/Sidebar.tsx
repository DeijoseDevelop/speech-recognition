"use client";

import { FC, useEffect, useState } from 'react';
import { Accordion, AccordionItem, Button, Link } from '@nextui-org/react';
import { FaBars } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import { hasPermission, hasPermissionStartsAt, PERMISSIONS } from '@/utils/hasPermissions';
import useClientQuery from '@/stores/clients/useClientQuery';

export interface SubRoute {
    title: string;
    path: string;
}

export interface MenuItem {
    title: string;
    icon: JSX.Element;
    subRoutes: SubRoute[];
}

export interface SidebarProps {
    menuItems: MenuItem[];
}

const Sidebar: FC<SidebarProps> = ({ menuItems }) => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [screenHeight, setScreenHeight] = useState<number | null>(null);
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

    // TODO: Quitar esto para usar la vista base
    const { clients } = useClientQuery();

    useEffect(() => {
        setScreenHeight(window.screen.height);
    }, []);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        setFilteredMenuItems(filterMenuItems(menuItems));
    }, [menuItems]);

    const filterSubMenuItems = (subRoutes: SubRoute[]): SubRoute[] => {
        return subRoutes.filter(subRoute => {
            if (subRoute.title.toLowerCase().includes("nuevo") && !hasPermissionStartsAt("create")) {
                return false;
            }
            return true;
        });
    };

    const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
        return items.map(item => {
            const filteredSubRoutes = filterSubMenuItems(item.subRoutes);
            return {
                ...item,
                subRoutes: filteredSubRoutes
            };
        }).filter(item => {
            if (item.title === 'Agenda') {
                return hasPermission(PERMISSIONS.events.read);
            } if (item.title === 'Clientes') {
                return hasPermission(PERMISSIONS.clients.read);
            } else if (item.title === 'Asesores') {
                return hasPermission(PERMISSIONS.advisors.read);
            } else if (item.title === 'Roles') {
                return hasPermission(PERMISSIONS.roles.read);
            }
            return true;
        });
    };

    return (
        <div style={{ height: screenHeight ? `${screenHeight}px` : '100vh' }}>
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <Button onPress={handleToggleSidebar}>
                    <FaBars />
                </Button>
            </div>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={handleCloseSidebar}></div>
            )}

            <div className={`fixed z-40 lg:static bg-gray-100 ${isSidebarOpen ? "w-full" : "w-64"} h-full p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
                <Accordion>
                    {filteredMenuItems.map((menuItem) => (
                        <AccordionItem
                            key={menuItem.title}
                            aria-label={menuItem.title}
                            title={
                                <div className="flex items-center">
                                    {menuItem.icon}
                                    <span className="ml-2">{menuItem.title}</span>
                                </div>
                            }
                            textValue={menuItem.title}
                        >
                            <ul>
                                {menuItem.subRoutes.map((subRoute) => (
                                    <li key={subRoute.title} className="hover:bg-gray-200">
                                        <Link
                                            className="p-2 text-black w-full h-full cursor-pointer"
                                            onClick={() => {
                                                handleCloseSidebar();
                                                // TODO: Quitar esto para usar la vista base
                                                if (subRoute.title === "Directorio de clientes") {
                                                    router.replace(`${subRoute.path}/${clients![0].ID ?? 6}`)
                                                } else {
                                                    router.replace(subRoute.path);
                                                }
                                            }}
                                        >
                                            {subRoute.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Sidebar;
