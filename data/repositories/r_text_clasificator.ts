import BaseRepository from "./r_base";

export class VoiceRecognitionRepository extends BaseRepository {
    public async sendText({ text }: { text: string }) {
        const formData: FormData = new FormData();
        formData.append("text", text);

        return await this.post({
            path: "/classificator/predict/",
            body: formData
        });
    }
}