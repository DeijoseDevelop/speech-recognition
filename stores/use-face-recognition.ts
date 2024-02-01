import { FaceRecognitionRepository } from "@/data/repositories/r_face_recognition";
import { UseCaseException } from "@/data/use_cases/uc_base";
import { FaceRecognitionUseCase, FaceRecognitionUseCaseParams } from "@/data/use_cases/uc_face_recognition";
import { FaceRecognitionResponse, Person } from "@/entities/face-recognition";
import { create } from "zustand";

export interface VideoConstraints {
    width: number;
    height: number;
    facingMode: string;
}

export interface useFaceRecognitionProps {
    person: Person;
    image: string | null;
    picture: Blob | null;
    imageSrc: string | null;
    devices: MediaDeviceInfo[];
    videoConstraints: VideoConstraints;
    isLoading: boolean;
    isFinished: boolean;

    getPerson: () => Person;
    getImage: () => string | null;
    getPicture: () => Blob | null;
    getImageSrc: () => string | null;
    getDevices: () => MediaDeviceInfo[];
    getVideoConstraints: () => VideoConstraints;
    getIsLoading: () => boolean;
    getIsFinished: () => boolean;

    setImage: (image: string | null) => void;
    setPicture: (picture: Blob | null) => void;
    setImageSrc: (image: string | null) => void;
    setDevices: (devices: MediaDeviceInfo[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsFinished: (isFinished: boolean) => void;

    sendPicture: () => Promise<void>;
}

const faceRecognitionUseCase = new FaceRecognitionUseCase({
    repository: new FaceRecognitionRepository()
});

export const useFaceRecognition = create<useFaceRecognitionProps>((set, get) => ({
    person: {},
    image: null,
    picture: null,
    imageSrc: null,
    devices: [],
    videoConstraints: {
        width: 480,
        height: 480,
        facingMode: "user"
    },
    isLoading: false,
    isFinished: false,

    getPerson: () => get().person,
    getImage: () => get().image,
    getPicture: () => get().picture,
    getImageSrc: () => get().imageSrc,
    getDevices: () => get().devices,
    getVideoConstraints: () => get().videoConstraints,
    getIsLoading: () => get().isLoading,
    getIsFinished: () => get().isFinished,

    setImage: (image: string | null) => set({ image }),
    setPicture: (picture: Blob | null) => set({ picture }),
    setImageSrc: (imageSrc: string | null) => set({ imageSrc }),
    setDevices: (devices: MediaDeviceInfo[]) => set({ devices }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setIsFinished: (isFinished: boolean) => set({ isFinished }),

    sendPicture: async () => {
        try {
            const response: FaceRecognitionResponse = await faceRecognitionUseCase.call({
                params: new FaceRecognitionUseCaseParams({
                    picture: get().picture!
                })
            });
        set({
            image: `data:image/jpeg;base64,${response.image}`,
            person: response.data![0]
        });
        } catch (error) {
            if (error instanceof UseCaseException) {
                console.log(error.message);
                set({ isLoading: false, isFinished: false });
                throw new Error(error.message);
            }
        }
    },
}));