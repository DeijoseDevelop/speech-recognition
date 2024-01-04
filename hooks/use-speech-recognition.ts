"use client";
import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>();

    useEffect(() => {
        if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
            const newRec = new webkitSpeechRecognition();

            if (!recognition) {
                setRecognition(newRec);
            }

            let rec = recognition || newRec;

            rec!.interimResults = true;
            // rec.continuous = true;

            rec!.onstart = () => {
                setIsRecording(true);
                console.log(rec);
            };

            rec!.onresult = (event) => {
                const transcriptArr = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setTranscript(transcriptArr);
            };

            rec!.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setRecognition(new webkitSpeechRecognition());
                setIsRecording(false);
                setHasEnded(true);
            };

            rec!.onend = () => {
                console.info("Speech recognition ended");
                setRecognition(new webkitSpeechRecognition());
                setIsRecording(false);
                setHasEnded(true);
            };
        } else {
            alert("Tu navegador no soporta reconocimiento de voz.");
        }
    }, [isRecording, recognition]);

    const startRecording = () => {
        if (recognition) {
            console.log("START");
            try {
                recognition!.start();
            } catch (e) {
                console.error("El reconocimiento ya se inició", e);
            }
        }
    };

    const stopRecording = () => {
        if (recognition) {
            recognition!.stop();
        }
    };

    return {
        isRecording,
        transcript,
        startRecording,
        stopRecording,
        hasEnded,
    };
};

export default useSpeechRecognition;