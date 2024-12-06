import Image from "next/image";
import { libraryBg } from "@/utils/images";

export default function LibraryBackground() {
    return (
        <div
            style={{
                position: "absolute",
                zIndex: -2,
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                borderRadius: 0,
            }}
        >
            <Image
                src={libraryBg}
                alt={`library background`}
                fill
                style={{ objectFit: "cover" }}
            />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1
                }}
            />
        </div>
    );
}