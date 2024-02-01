export interface FaceRecognitionResponse {
    data?: Person[];
    image?: string;
    message?: string;
}

export interface Person {
    name?: string;
    matched?: boolean;
    face_locations?: number[];
}