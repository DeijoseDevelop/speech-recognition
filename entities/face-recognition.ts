export interface FaceRecognitionResponse {
    data?: Person[];
    image?: string;
    message?: string;
}

export interface Person {
    name?: string;
    document_number?: string;
    gender?: string;
    user_type?: string;
    dependency?: string;
    academic_program?: string;
    matched?: boolean;
    face_locations?: FaceLocation;
}

export interface FaceLocation {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}