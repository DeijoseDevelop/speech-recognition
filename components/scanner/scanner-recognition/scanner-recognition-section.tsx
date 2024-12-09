import ScannerRecognitionImage from "./scanner-recognition-image";
import ScannerRecognitionButton from "./scanner-recognition-button";
import { ScannerRecognitionSectionProps } from "@/entities/scanner-recognition-props";

export default function ScannerRecognitionSection({
    width,
    height,
    image,
    imageClassName,
    isFaceModal
}: ScannerRecognitionSectionProps) {
    return (
        <section className="w-3/6 flex flex-col justify-between items-center h-40">
            <div className={imageClassName ?? ""}>
                <ScannerRecognitionImage
                    image={image}
                    width={width}
                    height={height}
                    isFaceModal={isFaceModal}
                />
            </div>
            <ScannerRecognitionButton isFace={isFaceModal ?? false} />
        </section>
    );
}