import Image from "next/image";
import { scannerBg } from "@/utils/images";

export default function ScannerBackground() {

    return (
        <Image
            src={scannerBg}
            fill
            alt="Scanner Background"
            style={{
                zIndex: -1,
            }}
        />
    );
}