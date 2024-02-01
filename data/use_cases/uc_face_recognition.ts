import { Params, UseCase, UseCaseException } from "./uc_base";
import { FaceRecognitionRepository } from '../repositories/r_face_recognition';
import { FaceRecognitionResponse } from "@/entities/face-recognition";
import { AxiosResponse } from "axios";

export class FaceRecognitionUseCaseParams extends Params {
    public picture: Blob;

    constructor({ picture }: { picture: Blob }) {
        super();
        this.picture = picture;
    }
}


export class FaceRecognitionUseCase implements UseCase<FaceRecognitionUseCaseParams, FaceRecognitionResponse> {
    public reporisoty: FaceRecognitionRepository;

    constructor({ repository }: { repository: FaceRecognitionRepository }) {
        this.reporisoty = repository;
    }

    public async call({ params }: { params: FaceRecognitionUseCaseParams }) {
        const { picture } = params;
        const response: Response = await this.reporisoty.sendPicture({ picture });
        const json: FaceRecognitionResponse = await response.json();

        switch (response.status) {
            case 200:
                return json
            default:
                throw new UseCaseException(json.message ?? "Ha ocurrido un error.");
        }
    }
}