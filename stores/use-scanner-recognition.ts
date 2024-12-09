import { useScannerRecognitionModalProps } from "@/entities/scanner-recognition-props";
import { create } from "zustand";

export const useScannerRecognition = create<useScannerRecognitionModalProps>((set, get) => ({
    isOpenFace: false,
    defaultOpenFace: false,
    onCloseFace: () => set({ isOpenFace: false }),
    onOpenFace: () => set({ isOpenFace: true }),
    onChangeFace: (isOpenFace: boolean | undefined) => set({ isOpenFace }),
    onOpenChangeFace: () => set((state) => ({ isOpenFace: !state.isOpenFace })),

    isOpenVoice: false,
    defaultOpenVoice: false,
    onCloseVoice: () => set({ isOpenVoice: false }),
    onOpenVoice: () => set({ isOpenVoice: true }),
    onChangeVoice: (isOpenVoice: boolean | undefined) => set({ isOpenVoice }),
    onOpenChangeVoice: () => set((state) => ({ isOpenVoice: !state.isOpenVoice })),

    site: "",
    getSite: () => get().site,
    setSite: (site: string) => set({ site }),

    service: "",
    getService: () => get().service,
    setService: (service: string) => set({ service }),
}));