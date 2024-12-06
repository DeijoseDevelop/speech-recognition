import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string; // Agrega el campo 'id' al tipo User
        email?: string;
        token?: string;
    }

    interface Session {
        user: User & DefaultSession["user"];
    }

    interface JWT {
        id?: string;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
    }
}