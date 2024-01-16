"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function NextPageButton({ route }: { route: string }) {
    const router = useRouter();

    const navigateToScannerPage = () => router.push(route);

    return (
        <Button
            size="sm"
            onClick={navigateToScannerPage}
            className="
                        text-white
                        h-6
                        px-5
                        py-0
                        rounded-md
                        bg-gradient-to-r
                        from-button-linear-from
                        to-button-linear-to
                    "
        >
            Siguiente
        </Button>
    );
}