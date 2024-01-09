import React, { useState } from "react";

export default function VoiceControl() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");

    let recognition: SpeechRecognition;

    if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
        // Configuración del reconocimiento de voz
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function () {
            setIsRecording(true);
        };

        recognition.onresult = function (event) {
            const transcriptArr = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setTranscript(transcriptArr);
        };

        recognition.onerror = function (event) {
            console.error("Error en el reconocimiento de voz: ", event.error);
        };

        recognition.onend = function () {
            setIsRecording(false);
        };
    } else {
        alert("Tu navegador no soporta reconocimiento de voz.");
    }

    const startRecording = () => {
        try {
            recognition.start();
        } catch (e) {
            console.error("El reconocimiento ya se inició", e);
        }
    };

    const stopRecording = () => {
        recognition.stop();
    };

    return (
        <div>
            <button onClick={startRecording} disabled={isRecording}>Iniciar</button>
            <button onClick={stopRecording} disabled={!isRecording}>Detener</button>
            <p>{isRecording ? "Grabando..." : "Pulsa Iniciar para grabar"}</p>
            <p>Transcripción: {transcript}</p>
        </div>
    );
}
