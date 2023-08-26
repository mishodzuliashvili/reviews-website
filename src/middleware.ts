import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/locals";

function doesPathMatchPages(req: NextRequest, pages: string[]) {
  return RegExp(`^(/(${locales.join("|")}))?(${pages.join("|")})/?$`, "i").test(
    req.nextUrl.pathname
  );
}

function redirect(req: NextRequest, redirectURL: string) {
  return NextResponse.redirect(
    new URL(redirectURL, req.nextUrl.origin).toString()
  );
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

const authPages = ["/login", "/register"];
const defaultAuthPage = "/login";
const blockedPages = ["/blocked"];
const defaultBlockedPage = "/blocked";
const adminPages = ["/admin"];

export default withAuth(
  function onSuccess(req) {
    const token = req.nextauth.token;
    if (!token) {
      if (!doesPathMatchPages(req, authPages))
        return redirect(req, defaultAuthPage);
      return intlMiddleware(req);
    }
    if (
      doesPathMatchPages(req, authPages) ||
      (doesPathMatchPages(req, blockedPages) && !token.isBlocked) ||
      (doesPathMatchPages(req, adminPages) && !token.isAdmin)
    ) {
      return redirect(req, "/");
    }

    if (!doesPathMatchPages(req, blockedPages) && token.isBlocked) {
      return redirect(req, defaultBlockedPage);
    }
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
