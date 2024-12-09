import BaseRepository from "./r_base";

export class FaceRecognitionRepository extends BaseRepository {
    public async sendPicture({ picture, site, service }: { picture: Blob, site: string, service: string }) {
        const formData: FormData = new FormData();
        formData.append("picture", picture, "image.jpeg");
        formData.append("site", site);
        formData.append("service", service);

        return await this.post({
            path: "/recognition/detect/",
            body: formData,
            headers: new Headers({ 'x-api-key': process.env.X_API_KEY! }),
        });
    }
}