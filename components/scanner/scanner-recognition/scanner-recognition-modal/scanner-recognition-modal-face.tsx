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
import { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useFaceRecognition } from "@/stores/use-face-recognition";
import { base64ToBlob } from "@/utils/base64-to-blob";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading.json";
import Image from "next/image";
import { checkBlueImage } from "@/utils/images";
import { SwalAlert } from "@/utils/alert";


export default function ScannerRecognitionModalFace() {
  const { isOpenFace, onOpenChangeFace, onCloseFace } = useScannerRecognition();
  const {
      getDevices,
      getVideoConstraints,
      getIsLoading,
      getIsFinished,

      setPicture,
      setImageSrc,
      setDevices,
      setIsLoading,
      setIsFinished,

      sendPicture,
  } = useFaceRecognition();
  const webcamRef = useRef<Webcam>(null);

  const capture = async () => {
    const imageSrc: string | null = webcamRef.current!.getScreenshot();
    setImageSrc(imageSrc);

    if (imageSrc !== null) {
        try {
          const blob: Blob = base64ToBlob(imageSrc?.split("base64,")[1]!, "image/jpeg");
          setPicture(blob);

          setIsLoading(true);
          await sendPicture();
          setIsLoading(false);
          setIsFinished(true);

          setTimeout(() => onCloseFace(), 1000);
        } catch (error) {
          if (error instanceof Error) {
            onCloseFace()
            SwalAlert.showAlert({
              icon: "error",
              title: error.message,
            });
          }
        }
    }
  }

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
        {
            // console.log(mediaDevices);
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
        },
    [setDevices]
  );

  useEffect(() => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
      // console.log(getDevices());
      // const timer = setTimeout(() => capture(webcamRef), 4000);

      // return () => clearTimeout(timer);
  }, [getDevices, handleDevices]);

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpenFace}
        onOpenChange={onOpenChangeFace}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-4">
                <section className="flex flex-col gap-5">
                  {
                    getDevices().length !== 0
                    && !getIsLoading()
                    && !getIsFinished()
                    && <Webcam
                        className="rounded-lg"
                        audio={false}
                        width={480}
                        height={480}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            ...getVideoConstraints(),
                            deviceId: getDevices()[0].deviceId
                        }}
                      />
                  }
                  {
                    getIsLoading() && !getIsFinished() &&
                    <Lottie animationData={loadingAnimation} loop={true} />
                  }
                  {
                    !getIsLoading() && getIsFinished() &&
                    <div className="w-full h-full flex justify-center items-center p-10">
                      <Image
                        src={checkBlueImage}
                        width={200}
                        height={200}
                        alt="Check Image"
                      />
                    </div>
                  }
                  <section className="w-full flex justify-center">
                    <p className="text-black text-center text-sm w-8/12">
                      Intenta mirar fijamente la cámara.
                      Es importante que no hagas gestos para un mejor resultado.
                    </p>
                  </section>
                  <section className="w-full flex justify-center">
                    <Button
                      color="primary"
                      onClick={capture}
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