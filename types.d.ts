type UserSession = import("next-auth").Session & {
  userId: string;
};
