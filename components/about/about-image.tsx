import Image from "next/image";
import { aboutImage } from "@/utils/images";

export default function AboutImage() {
    return (
        <Image
            src={aboutImage}
            width={969}
            height={997}
            alt="About Image"
            className="mt-30"
        />
    );
}