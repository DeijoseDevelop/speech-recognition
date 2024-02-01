import BaseRepository from "./r_base";

export class FaceRecognitionRepository extends BaseRepository {
    public async sendPicture({ picture }: { picture: Blob }) {
        const formData: FormData = new FormData();
        formData.append("picture", picture, "image.jpeg");

        return await this.post({
            path: "/recognition/detect/",
            body: formData
        });
    }
}