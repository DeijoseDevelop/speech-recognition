"use client";

import { Button } from "@nextui-org/react";

export default function CustomButton({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {

    return (
        <Button
            size="sm"
            onClick={onClick}
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
            {children}
        </Button>
    );
}