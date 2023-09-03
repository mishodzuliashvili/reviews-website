import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import {
    getUserByEmail,
    getUserById,
    updateUserById,
} from "@/prisma-functions/users";
import { Account } from "@prisma/client";
import { Profile } from "next-auth";

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
        throw new Error("Invalid credentials");
    }
    const { email, password } = credentials;
    const user = await getUserByEmail(email);
    if (!user || !user.password || !(await compare(password, user.password))) {
        throw new Error("Email or password is incorrect");
    }
    if (user.isBlocked) {
        throw new Error("Your account is blocked");
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
    const { token, user, trigger, session } = params;

    if (trigger === "update") {
        if (session) {
            token.name = session.user.name;
        }
    }
    if (user) {
        token.id = user.id;
        await updateUserById(user.id, {
            lastLoginTime: new Date(),
        });
    }
    if (token) {
        const dbUser = await getUserById(token.id);
        if (dbUser) {
            token.isBlocked = dbUser.isBlocked;
            token.isAdmin = dbUser.isAdmin;
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
