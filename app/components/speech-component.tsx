"use client";

import { Button } from '@nextui-org/button';
import useSpeechRecognition from "@/app/hooks/use-speech-recognition";
import { useEffect } from "react";

export default function SpeechComponent() {
    const { isRecording, transcript, startRecording, stopRecording, hasEnded } = useSpeechRecognition();

    const getData = async () => {
        const formData = new FormData();
        console.log(transcript);
        formData.append("text", transcript);
        const response = await fetch("http://localhost:5000/api/v1/classificator/predict/", {
            method: "POST",
            body: formData,
        });
        const json = await response.json();
        console.log(json);
    }

    useEffect(() => {
        if (hasEnded) getData();
    }, [isRecording, hasEnded]);

    return (
        <>
            <Button color="primary" variant="bordered" onClick={startRecording} disabled={isRecording}>Iniciar</Button>
            <Button color="primary" variant="bordered" onClick={stopRecording} disabled={!isRecording}>Detener</Button>
            <p>{isRecording ? "Grabando..." : "Pulsa Iniciar para grabar"}</p>
            <p>Transcripción: {transcript}</p>
        </>
    );
}