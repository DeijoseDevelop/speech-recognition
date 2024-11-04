import { UseCaseException } from "@/data/use_cases/uc_base";
import { VoiceRecognitionUseCase, VoiceRecognitionUseCaseParams } from "@/data/use_cases/uc_text_clasificator";
import { create } from "zustand";
import { VoiceRecognitionRepository } from '../data/repositories/r_text_clasificator';

export interface TextCategories {
    "wait for": string;
    "rent book": string;
    "use computer": string;
    "other": string;
    [key: string]: string;
}

export interface useFaceRecognitionProps {
    isLoading: boolean;
    isFinished: boolean;
    textCategories: TextCategories;
    categoryRecognized: string | null;

    getIsLoading: () => boolean;
    getIsFinished: () => boolean;
    getCategoryRecognized: () => string | null;

    setIsLoading: (isFinished: boolean) => void;
    setIsFinished: (isFinished: boolean) => void;

    sendText: (transcript: string) => Promise<void>;
}

const voiceRecognitionUseCase = new VoiceRecognitionUseCase({
    repository: new VoiceRecognitionRepository()
});


export const useVoiceRecognition = create<useFaceRecognitionProps>((set, get) => ({
    isLoading: false,
    isFinished: false,
    textCategories: {
        "wait for": "Esperar",
        "rent book": "Alquilar un libro",
        "use computer": "Usar computador",
        "other": "Otro",
    },
    categoryRecognized: null,

    getIsLoading: () => get().isLoading,
    getIsFinished: () => get().isFinished,
    getCategoryRecognized: () => get().categoryRecognized,

    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setIsFinished: (isFinished: boolean) => set({ isFinished }),

    sendText: async (transcript: string) => {
        try {
            const response = await voiceRecognitionUseCase.call({
                params: new VoiceRecognitionUseCaseParams({
                    text: transcript
                })
            })
            console.log('RESPONSE');
            console.log(response);
            const categoryRecognized: string = get().textCategories[response.data!]
            set({ categoryRecognized });
            console.log(categoryRecognized);
            console.log(get().categoryRecognized);
        } catch (error) {
            if (error instanceof UseCaseException) {
                console.log(error.message);
            }
        }
    },
}));