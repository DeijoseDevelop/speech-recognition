import { create } from "zustand";
import { AuthRepository } from '@/data/repositories/r_auth';
import { LoginUseCase, LoginUseCaseParams, UserLogin } from "@/data/use_cases/auth/uc_login";
import { Storage } from "@/constants/Storage";
import { User } from "@/entities/user";

export interface UseAuthProps {
    login: (credentials: User) => Promise<User>;
    logout: () => Promise<void>;
}

const authRepository: AuthRepository = new AuthRepository();

export const useAuth = create<UseAuthProps>((set, get) => ({
    login: async (credentials: User) => {
        const response: UserLogin = await new LoginUseCase({
            repository: authRepository,
        }).call({
            params: new LoginUseCaseParams({ ...credentials }),
        });

        localStorage.setItem(Storage.access_token, response.accessToken!);

        return response.accessToken!;
    },
    logout: async () => {
        Object.values(Storage).forEach((key) => {
            localStorage.removeItem(key);
        });
    },
}));