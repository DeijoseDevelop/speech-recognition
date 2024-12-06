import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req) {
                console.log(credentials);
                const user: User = {
                    id: credentials.email,
                    email: credentials.email,
                    token: credentials.csrfToken,
                };

                return user;

            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                token.accessToken = user.token;
                token.id = user.id
            }

            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            session.user.id = token.id;
            session!.user!.token = token.accessToken;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);