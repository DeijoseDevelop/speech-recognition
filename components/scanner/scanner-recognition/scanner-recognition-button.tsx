"use client";

import { useScannerRecognition } from "@/stores/use-scanner-recognition";
import { Button } from "@nextui-org/react";

export default function ScannerRecognitionButton({ isFace = true }: { isFace: boolean }) {
    const {
        onOpenFace,
        onOpenVoice
    } = useScannerRecognition();
    return (
        <Button
            onPress={isFace ? onOpenFace: onOpenVoice}
            size="sm"
            color="primary"
            className="
                text-white
                h-6
                px-5
                py-0
                rounded-md
            "
        >
            Escanear
        </Button>
    );
}