'use client';

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { base64ToBlob } from "@/utils/base64-to-blob";
import axios from "axios";
import { useFaceRecognition } from "@/stores/use-face-recognition";

export default function WebcamComponent() {
    const {
        getImage,
        getDevices,

        setImage,
        setImageSrc,
        setDevices,
    } = useFaceRecognition();
    const webcamRef = useRef<Webcam>(null);
    const URL = "http://localhost:5000/api/v1/recognition/detect/"

    const videoConstraints = {
        width: 720,
        height: 720,
        facingMode: "user"
    };

    const capture = async () => {
        const imageSrc: string | null = webcamRef.current!.getScreenshot();
        setImageSrc(imageSrc);
        console.log(getDevices());
        if (imageSrc !== null) {
            // console.log(imageSrc);
            // console.log(imageSrc?.split("base64,"));
            // console.log(imageSrc?.split("base64,")[1]!);
            const blob: Blob = base64ToBlob(imageSrc?.split("base64,")[1]!, "image/jpeg");
            // setImage(imageSrc);

            const formData: FormData = new FormData();
            formData.append("picture", blob, "image.jpeg");
            const response = await axios.post(URL, formData, {
                headers: { "x-api-key": process.env.X_API_KEY }
            });
            const json = response.data;
            // console.log(response);
            // console.log(json);
            // console.log(`data:image/jpeg;base64,${json.image}`);
            setImage(`data:image/jpeg;base64,${json.image}`);
        }
    }

    const handleDevices = useCallback(
        (mediaDevices: MediaDeviceInfo[]) =>
            {
                console.log(mediaDevices);
                setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
            },
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
            console.log(getDevices());
        // const timer = setTimeout(capture, 3000);
            // return () => clearTimeout(timer);
        },
        [getDevices, handleDevices]
    );

    return (
        <>
            {/* {
                devices.map((device, key) => (
                    <div key={key}>
                        <Webcam
                            audio={false}
                            width={1280}
                            height={1280}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                ...videoConstraints,
                                deviceId: device.deviceId
                            }}
                        />
                    </div>
                ))
            } */}
            {
                getDevices().length !== 0 &&
                    <div>
                        <Webcam
                            className="rounded-lg"
                            audio={false}
                            width={480}
                            height={720}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                ...videoConstraints,
                                deviceId: getDevices()[0].deviceId
                            }}
                        />
                    </div>
            }
            <Button color="primary" variant="bordered" onClick={capture}>Capture</Button>
        </>
    );
}
