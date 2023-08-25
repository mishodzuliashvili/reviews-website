import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { signOut } from "next-auth/react";

const locales = ["en", "ka"];
const publicPages = ["/login", "/register"];
const adminPages = ["/admin"];
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    const adminPathNames = RegExp(
      `^(/(${locales.join("|")}))?(${adminPages.join("|")})/?$`,
      "i"
    );
    if (
      adminPathNames.test(req.nextUrl.pathname) &&
      req.nextauth.token?.isAdmin === false
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
    }
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token != null && token.isBlocked !== true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
