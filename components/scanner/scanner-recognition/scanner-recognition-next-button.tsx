"use client";

import { useFaceRecognition } from "@/stores/use-face-recognition";
import { useScannerRecognition } from "@/stores/use-scanner-recognition";
import { useVoiceRecognition } from "@/stores/use-voice-recognition";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ScannerRecognitionNextButton() {
    const router = useRouter();
    const { getImage } = useFaceRecognition();
    const { getCategoryRecognized } = useVoiceRecognition();
    const { getService } = useScannerRecognition();

    return (
        <Button
            color="primary"
            onClick={() => router.push("/information")}
            isDisabled={getImage() === null || getService() === ""}
            className="
            rounded-md
            bg-gradient-to-r
            from-[#8600FF]
            to-[#2D94DA]
            px-10
            py-5
            "
        >
            <p className="text-2xl">Comenzar</p>
        </Button>
    );
}