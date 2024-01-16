import Image from "next/image";
import { homeImage } from "@/utils/images";

export default function HomeImage() {
    return (
        <Image
            src={homeImage}
            width={869}
            height={776}
            alt="Home Image"
        />
    );
}