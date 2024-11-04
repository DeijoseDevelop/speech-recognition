import BaseRepository from "./r_base";

export class VoiceRecognitionRepository extends BaseRepository {
    public async sendText({ text }: { text: string }) {

        return await this.post({
            path: "/classificator/predict/",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-api-key": process.env.X_API_KEY!,
            }),
            body: JSON.stringify({ text })
        });
    }
}