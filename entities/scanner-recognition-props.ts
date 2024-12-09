import { StaticImageData } from "next/image";

export interface ScannerRecognitionSectionProps {
    width?: number | null;
    height?: number | null;
    image: StaticImageData;
    imageClassName?: string | null;
    isFaceModal?: boolean | null;
}

export interface useScannerRecognitionModalProps {
    isOpenFace: boolean;
    defaultOpenFace?: boolean;
    onCloseFace: () => void;
    onOpenFace: ()=> void;
    onChangeFace: (isOpen: boolean | undefined) => void;
    onOpenChangeFace: () => void;

    isOpenVoice: boolean;
    defaultOpenVoice?: boolean;
    onCloseVoice: () => void;
    onOpenVoice: ()=> void;
    onChangeVoice: (isOpen: boolean | undefined) => void;
    onOpenChangeVoice: () => void;

    site: string;
    getSite: () => string;
    setSite: (site: string) => void;

    service: string;
    getService: () => string;
    setService: (service: string) => void;
}
