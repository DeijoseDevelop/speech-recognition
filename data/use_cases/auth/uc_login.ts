import { User } from "@/entities/user";
import { Params, UseCase, UseCaseException } from "../uc_base";
import { AuthRepository } from "@/data/repositories/r_auth";

export interface UserLogin {
    access_token?: string;
    error?: string;
    message?: string;
}

export class LoginUseCaseParams extends Params {
    constructor(credentials: User) {
        super();
        this.credentials = credentials;
    }

    public credentials: User;
}


export class LoginUseCase extends UseCase<UserLogin, LoginUseCaseParams> {
    constructor({ repository }: { repository: AuthRepository }) {
        super();
        this.repository = repository;
    }

    private repository: AuthRepository;

    public async call({ params }: { params?: LoginUseCaseParams }): Promise<UserLogin> {
        const response: Response = await this.repository.login(params!.credentials!);

        const apiResponse: any = await response.json();
        console.log(apiResponse)
        if (response.status == 200 && response.ok) {
            return apiResponse;
        }

        throw new UseCaseException(apiResponse.message || apiResponse.error!);
    }
}