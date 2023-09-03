import NextAuth from "next-auth";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isBlocked: boolean;
    isAdmin: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      isBlocked: boolean;
      isAdmin: boolean;
    };
  }
}
