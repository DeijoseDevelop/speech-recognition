"use client";

import { ScannerRecognitionSectionProps } from "@/entities/scanner-recognition-props";
import { useFaceRecognition } from "@/stores/use-face-recognition";
import Image from "next/image";

export default function ScannerRecognitionImage({
    width,
    height,
    image,
    isFaceModal,
}: ScannerRecognitionSectionProps) {
    const { getImage } = useFaceRecognition();

    return (
        <div>
            {
                isFaceModal && getImage() !== null && getImage() !== ""
                    ? <Image
                        src={getImage()!}
                        width={width ?? 200}
                        height={height ?? 200}
                        alt="Screeshot"
                    />
                    : <Image
                        src={image}
                        width={width ?? 200}
                        height={height ?? 200}
                        alt="Silueta Image"
                    />
            }
        </div>
    );
}