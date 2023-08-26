import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

function updateLastLoginTime(id: string) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      lastLoginTime: new Date(),
    },
  });
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      if (token) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
          select: {
            isAdmin: true,
            isBlocked: true,
          },
        });
        token.isBlocked = dbUser?.isBlocked;
        token.isAdmin = dbUser?.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        isAdmin: token.isAdmin,
        isBlocked: token.isBlocked,
      } as typeof session.user;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!credentials || !email || !password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (
          !user ||
          !user.password ||
          !(await compare(password, user.password))
        ) {
          throw new Error("Email or password is incorrect");
        }
        if (user.isBlocked) {
          throw new Error("User is blocked");
        }
        await updateLastLoginTime(user.id);
        return {
          id: user.id,
          email: user.email,
        };
      },
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
