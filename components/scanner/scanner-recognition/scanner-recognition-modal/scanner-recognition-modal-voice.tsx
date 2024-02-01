"use client";

import { useScannerRecognition } from "@/stores/use-scanner-recognition";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import Image from "next/image";
import { audioImage } from "@/utils/images";
import { useVoiceRecognition } from "@/stores/use-voice-recognition";
import Lottie from "lottie-react";
import voiceAnimation from "@/assets/animations/voice_animation.json";
import useSpeechRecognition from "@/hooks/use-speech-recognition";
import { useEffect } from "react";

export default function ScannerRecognitionModalVoice() {
  const { isRecording, transcript, startRecording, stopRecording, hasEnded } = useSpeechRecognition();
  const { isOpenVoice, onCloseVoice, onOpenChangeVoice } = useScannerRecognition();
  const {
      getIsLoading,
      getIsFinished,

      setIsLoading,
      setIsFinished,

      sendText,
  } = useVoiceRecognition();

  const capture = async () => {
    console.log(getIsLoading());
    console.log(getIsFinished());
    setIsLoading(true);
    await sendText(transcript || "Quiero un PC");
    setIsFinished(true);
    setIsLoading(false);
    setTimeout(() => {
      onCloseVoice();
    }, 500);
    // console.log(transcript || "Quiero un PC");
  }

  useEffect(() => {
    if (hasEnded) capture();
}, [isRecording, hasEnded]);

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpenVoice}
        onOpenChange={onOpenChangeVoice}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-4">
                <section className="flex flex-col gap-5">
                  <section className="flex justify-center items-center bg-primary h-40">
                    {
                      !isRecording && !getIsLoading()
                      ? <Image
                        src={audioImage}
                        width={380}
                        height={280}
                        alt="Check Image"
                      />
                      : <Lottie
                        style={{ width: 350 }}
                        animationData={voiceAnimation}
                        loop={true}
                      />
                    }
                  </section>
                  <section className="w-full flex justify-center">
                    <p className="text-black text-center text-sm w-8/12">
                      {
                        !isRecording
                        ? `Ahora di lo que vienes a hacer.
                          Trata de hacerlo en un tono lo suficientemente alto.`
                        : "Ahora habla fuerte y claro."
                      }
                    </p>
                  </section>
                  <section className="w-full flex justify-center">
                    <Button
                      color="primary"
                      onClick={startRecording}
                      isDisabled={isRecording || getIsLoading()}
                      className="
                        rounded-md
                        bg-gradient-to-r
                        from-[#8600FF]
                        to-[#2D94DA]
                        px-10
                        py-5
                      "
                    >
                      <p className="text-2xl">Escanear</p>
                    </Button>
                  </section>
                </section>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}