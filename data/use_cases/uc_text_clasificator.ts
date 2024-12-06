import { Params, UseCase, UseCaseException } from "./uc_base";
import { VoiceRecognitionRepository } from "../repositories/r_text_clasificator";
import { VoiceRecognitionResponse } from "@/entities/voice-recognition";

export class VoiceRecognitionUseCaseParams extends Params {
    public text: string;

    constructor({ text }: { text: string }) {
        super();
        this.text = text;
    }
}


export class VoiceRecognitionUseCase implements UseCase<VoiceRecognitionResponse, VoiceRecognitionUseCaseParams> {
    public reporisoty: VoiceRecognitionRepository;

    constructor({ repository }: { repository: VoiceRecognitionRepository }) {
        this.reporisoty = repository;
    }

    public async call({ params }: { params: VoiceRecognitionUseCaseParams }) {
        const { text } = params;
        const response: Response = await this.reporisoty.sendText({ text });
        const json: VoiceRecognitionResponse = await response.json();

        switch (response.status) {
            case 200:
                return json
            default:
                throw new UseCaseException(json.message ?? "Ha ocurrido un error.");
        }
    }
}