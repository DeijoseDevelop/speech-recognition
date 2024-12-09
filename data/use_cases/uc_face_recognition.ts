import { Params, UseCase, UseCaseException } from "./uc_base";
import { FaceRecognitionRepository } from '../repositories/r_face_recognition';
import { FaceRecognitionResponse } from "@/entities/face-recognition";

export class FaceRecognitionUseCaseParams extends Params {
    public picture: Blob;
    public site: string;
    public service: string;

    constructor({ picture, site, service }: { picture: Blob, site: string, service: string }) {
        super();
        this.picture = picture;
        this.site = site;
        this.service = service;
    }
}


export class FaceRecognitionUseCase implements UseCase<FaceRecognitionResponse, FaceRecognitionUseCaseParams> {
    public reporisoty: FaceRecognitionRepository;

    constructor({ repository }: { repository: FaceRecognitionRepository }) {
        this.reporisoty = repository;
    }

    public async call({ params }: { params: FaceRecognitionUseCaseParams }) {
        const { picture, site, service } = params;
        const response: Response = await this.reporisoty.sendPicture({ picture, site, service });
        const json: FaceRecognitionResponse = await response.json();

        switch (response.status) {
            case 200:
                return json
            default:
                throw new UseCaseException(json.message ?? "Ha ocurrido un error.");
        }
    }
}