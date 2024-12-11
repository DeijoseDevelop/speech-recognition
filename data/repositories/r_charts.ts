import BaseRepository from "./r_base";

export class ChartsRepository extends BaseRepository {
    public async getData(): Promise<Response> {
        return await this.get({
            url: "http://localhost:8000/api/v1",
            path: "/ingress_records",
            headers: this.buildHeadersWithToken(),
        });
    }
}