import { create } from "zustand";

export interface VideoConstraints {
    width: number;
    height: number;
    facingMode: string;
}

export interface useFaceRecognitionProps {
    image: string | null;
    imageSrc: string | null;
    devices: MediaDeviceInfo[];
    videoConstraints: VideoConstraints;

    getImage: () => string | null;
    getImageSrc: () => string | null;
    getDevices: () => MediaDeviceInfo[];
    getVideoConstraints: () => VideoConstraints;

    setImage: (image: string | null) => void;
    setImageSrc: (image: string | null) => void;
    setDevices: (devices: MediaDeviceInfo[]) => void;
}

export const useFaceRecognition = create<useFaceRecognitionProps>((set, get) => ({
    image: null,
    imageSrc: null,
    devices: [],
    videoConstraints: {
        width: 720,
        height: 720,
        facingMode: "user"
    },

    getImage: () => get().image,
    getImageSrc: () => get().imageSrc,
    getDevices: () => get().devices,
    getVideoConstraints: () => get().videoConstraints,

    setImage: (image: string | null) => set({ image }),
    setImageSrc: (imageSrc: string | null) => set({ imageSrc }),
    setDevices: (devices: MediaDeviceInfo[]) => set({ devices }),
}));