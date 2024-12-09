"use client";

import { useFaceRecognition } from "@/stores/use-face-recognition";
import { useScannerRecognition } from "@/stores/use-scanner-recognition";
import { useVoiceRecognition } from "@/stores/use-voice-recognition";
import { Button } from "@nextui-org/react";

export default function ScannerRecognitionButton({ isFace = true }: { isFace: boolean }) {
    const {
        onOpenFace,
        onOpenVoice,
        getService,
    } = useScannerRecognition();

    console.log(getService());

    const { getImage } = useFaceRecognition();
    const { getCategoryRecognized } = useVoiceRecognition();

    if (isFace && getImage() !== null) {
        return <Button
            disabled={getService() === ""}
            size="sm"
            color="primary"
            variant="bordered"
            isDisabled
            className="
                text-primary
                h-6
                px-5
                py-0
                rounded-md
            "
        >
            Escaneado
        </Button>
    } else if (isFace && getImage() === null) {
        return <Button
            onPress={isFace ? onOpenFace : onOpenVoice}
            isDisabled={getService() === ""}
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
    }

    // if (!isFace && getCategoryRecognized() === null) {
    //     return <Button
    //         onPress={isFace ? onOpenFace: onOpenVoice}
    //         size="sm"
    //         color="primary"
    //         className="
    //             text-white
    //             h-6
    //             px-5
    //             py-0
    //             rounded-md
    //         "
    //     >
    //         Escanear
    //     </Button>
    // } else if (!isFace && getCategoryRecognized() !== null) {
    //     return <Button
    //         size="sm"
    //         color="primary"
    //         variant="bordered"
    //         isDisabled
    //         className="
    //             text-primary
    //             h-6
    //             px-5
    //             py-0
    //             rounded-md
    //         "
    //     >
    //         Escaneado
    //     </Button>
    // }

    return (
        <>
            {
                !isFace
                && <Button
                    onPress={isFace ? onOpenFace : onOpenVoice}
                    isDisabled={getService() === ""}
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
            }
            {/* {
                !isFace
                && <Button
                    size="sm"
                    color="primary"
                    variant="bordered"
                    isDisabled
                    className="
                        text-primary
                        h-6
                        px-5
                        py-0
                        rounded-md
                    "
                >
                    Escaneado
                </Button>
            } */}
        </>
    );
}