import { User } from "@/entities/user";
import BaseRepository from "./r_base";
import { Storage } from "@/constants/Storage";

export class UsersRepository extends BaseRepository {
    public async getUsers(isInternal: boolean): Promise<Response> {
        const url = this.getUrlByUserType(isInternal);

        return await this.get({
            path: url,
            headers: this.buildHeadersWithToken(),
        });
    }

    public async createUser({ userData, isInternal }: { userData: FormData, isInternal: boolean }): Promise<Response> {
        const url = this.getUrlByUserType(isInternal);
        const headers = new Headers({
            Authorization: `Bearer ${localStorage.getItem(Storage.access_token) ?? ''}`
        });

        return await this.post({
            path: url,
            headers: headers,
            body: userData,
        });
    }

    public async updateUser({ userId, userData }: { userId: number, userData: FormData }): Promise<Response> {
        const url = `/users/${userId}/`;
        const headers = new Headers({
            Authorization: `Bearer ${localStorage.getItem(Storage.access_token) ?? ''}`
        });

        return await this.patch({
            path: url,
            headers: headers,
            body: userData,
        });
    }

    public async deleteUser({ userId }: { userId: number }): Promise<Response> {
        const url = `/users/${userId}/`;
        return await this.delete({
            path: url,
            headers: this.buildHeadersWithToken(),
        });
    }

    private getUrlByUserType(isInternal: boolean): string {
        let url = "/users/external/";

        if (isInternal) {
            url = "/users/internal/";
        }

        return url;
    }
}