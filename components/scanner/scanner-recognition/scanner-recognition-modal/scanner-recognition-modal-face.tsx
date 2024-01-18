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
import axios from "axios";

export default function ScannerRecognitionModalFace() {
  const {isOpenFace, onOpenChangeFace} = useScannerRecognition();
  const {
      getImage,
      getDevices,
      getVideoConstraints,

      setImage,
      setImageSrc,
      setDevices,
  } = useFaceRecognition();
  const webcamRef = useRef<Webcam>(null);
  const URL = "http://localhost:5000/api/v1/recognition/detect/";

  const capture = async () => {
    const imageSrc: string | null = webcamRef.current!.getScreenshot();
    setImageSrc(imageSrc);
    console.log(getDevices());
    if (imageSrc !== null) {
        console.log(imageSrc);
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
        console.log(json);
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
              {/* <ModalHeader className="flex flex-col gap-1 text-black">Escanear Rostro</ModalHeader> */}
              <ModalBody className="p-4">
                <section className="flex flex-col gap-5">
                  {
                    getDevices().length !== 0 &&
                    <Webcam
                        className="rounded-lg"
                        audio={false}
                        width={480}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            ...getVideoConstraints(),
                            deviceId: getDevices()[0].deviceId
                        }}
                    />
                  }
                  <div className="w-full flex justify-center">
                    <p className="text-black text-center text-sm w-8/12">
                      Intenta mirar fijamente la cámara.
                      Es importante que no hagas gestos para un mejor resultado.
                    </p>
                  </div>
                  <div className="w-full flex justify-center">
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
                  </div>
                </section>
                <section></section>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}