import { StaticImageData } from "next/image";

export interface ScannerRecognitionSectionProps {
    width?: number | null;
    height?: number | null;
    image: StaticImageData;
    imageClassName?: string | null;
    isFaceModal?: boolean | null;
}

export interface useScannerRecognitionModalProps {
    isOpenFace?: boolean;
    defaultOpenFace?: boolean;
    onCloseFace?: () => void;
    onOpenFace?: ()=> void;
    onChangeFace?: (isOpen: boolean | undefined) => void;
    onOpenChangeFace: () => void;

    isOpenVoice?: boolean;
    defaultOpenVoice?: boolean;
    onCloseVoice?: () => void;
    onOpenVoice?: ()=> void;
    onChangeVoice?: (isOpen: boolean | undefined) => void;
    onOpenChangeVoice: () => void;
}

export interface useScannerRecognitionProps extends useScannerRecognitionModalProps {}