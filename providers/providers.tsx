"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
