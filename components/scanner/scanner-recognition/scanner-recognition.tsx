"use client";

import { microphoneImage, siluetaImage } from "@/utils/images";
import ScannerRecognitionSection from "./scanner-recognition-section";
import ScannerRecognitionNextButton from "./scanner-recognition-next-button";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { LibraryServiceEnum } from "@/entities/LibraryServiceEnum";
import { useScannerRecognition } from "@/stores/use-scanner-recognition";

export default function ScannerRecognition() {
    const { setService, service } = useScannerRecognition();
    return (
        <>
            <section className="flex flex-col md:flex-row justify-center items-center gap-20">
                <Select
                    label="Servicios"
                    selectedKeys={service ? new Set([service]) : new Set()}
                    onSelectionChange={(keys: SharedSelection) => {
                        console.log(keys.currentKey);
                        setService(keys.currentKey ?? "");
                    }}
                >
                    {Object.values(LibraryServiceEnum).map((service) => (
                        <SelectItem key={service} value={service} textValue={service}>
                            {service}
                        </SelectItem>
                    ))}
                </Select>
                <ScannerRecognitionSection
                    image={siluetaImage}
                    width={220}
                    height={220}
                    isFaceModal
                />
                {/* <ScannerRecognitionSection
                    image={microphoneImage}
                    imageClassName="pt-2"
                /> */}
            </section>
            {/* <section className="flex justify-center items-center mt-10">
                <ScannerRecognitionNextButton />
            </section> */}
        </>
    );
}