import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        jwt: updateJWTToken,
        session: updateSession,
    },

    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: authorizeCredentials,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    pages: {
        signIn: "/login",
        error: "/login",
        signOut: "/login",
    },
};

async function authorizeCredentials(
    credentials: Record<"email" | "password", string> | undefined
) {
    if (!credentials) {
        throw new Error("InvalidCredentials");
    }
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user || !user.password || !(await compare(password, user.password))) {
        throw new Error("EmailOrPasswordIsIncorrect");
    }
    if (user.isBlocked) {
        throw new Error("UserIsBlocked");
    }
    return {
        id: user.id,
    };
}

async function updateJWTToken(params: {
    token: JWT;
    user: User | AdapterUser;
    trigger?: "update" | "signIn" | "signUp" | undefined;
    session?: any;
}) {
    const { token, user } = params;

    if (user) {
        token.id = user.id;
        try {
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    lastLoginTime: new Date(),
                },
            });
        } catch (error) {
            throw new Error("Cannot be connected with DB user");
        }
    }
    if (token) {
        try {
            const dbUser = await prisma.user.findUnique({
                where: {
                    id: token.id,
                },
            });
            if (dbUser) {
                token.name = dbUser.name;
                token.isBlocked = dbUser.isBlocked;
                token.isAdmin = dbUser.isAdmin;
            }
        } catch (error) {
            throw new Error("Cannot be connected with DB user");
        }
    }
    return token;
}

async function updateSession(
    params: { session: Session; token: JWT; user: AdapterUser } & {
        newSession: any;
        trigger: "update";
    }
) {
    const { session, token } = params;
    if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.isBlocked = token.isBlocked;
        session.user.isAdmin = token.isAdmin;
    }
    return session;
}
