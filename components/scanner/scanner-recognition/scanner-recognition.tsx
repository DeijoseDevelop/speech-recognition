import { microphoneImage, siluetaImage } from "@/utils/images";
import ScannerRecognitionSection from "./scanner-recognition-section";
import { Button } from "@nextui-org/react";
import ScannerRecognitionNextButton from "./scanner-recognition-next-button";

export default function ScannerRecognition() {
    return (
        <>
            <section className="flex justify-center items-center gap-20">
                <ScannerRecognitionSection
                    image={siluetaImage}
                    width={220}
                    height={220}
                    isFaceModal
                />
                <ScannerRecognitionSection
                    image={microphoneImage}
                    imageClassName="pt-7"
                />
            </section>
            <section className="flex justify-center items-center mt-10">
                <ScannerRecognitionNextButton />
            </section>
        </>
    );
}