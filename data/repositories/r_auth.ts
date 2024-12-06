import { User } from "@/entities/user";
import BaseRepository from "./r_base";

export class AuthRepository extends BaseRepository {
    public async login(credentials: User): Promise<Response> {
        return await this.post({
            path: "/auth/login",
            body: JSON.stringify(credentials),
            headers: this.buildHeaders(),
        });
    }
}