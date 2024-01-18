import { microphoneImage, siluetaImage } from "@/utils/images";
import ScannerRecognitionSection from "./scanner-recognition-section";

export default function ScannerRecognition() {
    return (
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
    );
}