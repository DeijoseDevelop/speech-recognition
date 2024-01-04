'use client';

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { base64ToBlob } from "@/utils/base64-to-blob";
import axios from "axios";

export default function WebcamComponent() {
    const [image, setImage] = useState<string | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const webcamRef = useRef<Webcam>(null);
    const URL = "http://localhost:5000/api/v1/recognition/detect/"

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capture = async () => {
        const imageSrc: string | null = webcamRef.current!.getScreenshot();
        if (imageSrc !== null) {
            console.log(imageSrc);
            console.log(imageSrc?.split("base64,"));
            console.log(imageSrc?.split("base64,")[1]!);
            const blob: Blob = base64ToBlob(imageSrc?.split("base64,")[1]!, "image/jpeg");
            // setImage(imageSrc);

            const formData: FormData = new FormData();
            formData.append("picture", blob, "image.jpeg");
            const response = await axios.post(URL, formData, {
                headers: { "x-api-key": process.env.X_API_KEY }
            });
            const json = response.data;
            console.log(response);
            console.log(json);
            console.log(`data:image/jpeg;base64,${json.image}`);
            setImage(`data:image/jpeg;base64,${json.image}`);
        }
    }

    const handleDevices = useCallback(
        (mediaDevices: MediaDeviceInfo[]) =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
            // const timer = setTimeout(capture, 3000);
            // return () => clearTimeout(timer);
        },
        [handleDevices]
    );

    return (
        <>
            {
                devices.map((device, key) => (
                    <div key={key}>
                        <Webcam
                            audio={false}
                            width={720}
                            height={720}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                ...videoConstraints,
                                deviceId: device.deviceId
                            }}
                        />
                    </div>
                ))
            }
            {
                image !== null && image !== ""
                    && <Image
                        src={image}
                        alt="Screeshot"
                        width={0}
                        height={0}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
            }
            <Button color="primary" variant="bordered" onClick={capture}>Capture</Button>
        </>
    );
}
