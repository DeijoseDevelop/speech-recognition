import BaseRepository from "./r_base";

export class UsersRepository extends BaseRepository {
    public async getUsers(isInternal: boolean): Promise<Response> {
        let url = "/users/external/";

        if (isInternal) {
            url = "/users/internal/";
        }

        return await this.get({
            path: url,
            headers: this.buildHeadersWithToken(),
        });
    }
}