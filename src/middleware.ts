import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/locals";

function doesPathMatchPages(req: NextRequest, pages: string[]) {
    return RegExp(
        `^(/(${locales.join("|")}))?(${pages.join("|")})/?$`,
        "i"
    ).test(req.nextUrl.pathname);
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

const publicPages = [""]; // path returns /ka not /ka/
const defaultPublicPage = "";
const authPages = ["/login", "/register"];
const defaultAuthPage = "/login";
const blockedPages = ["/blocked"];
const defaultBlockedPage = "/blocked";
const adminPages = ["/admin"];

const publicApiRoutes = ["/register", "/uploadthing", "/reviews", "/comments"];

export default withAuth(
    function onSuccess(req) {
        const token = req.nextauth.token;

        if (req.nextUrl.pathname.startsWith("/api")) {
            if (
                !publicApiRoutes.some((route) =>
                    req.nextUrl.pathname.startsWith("/api" + route)
                ) &&
                !token
            ) {
                return NextResponse.json(
                    {
                        error: "Not authenticated.",
                    },
                    {
                        status: 401,
                    }
                );
            } else {
                return NextResponse.next();
            }
        }

        if (!token) {
            if (
                !doesPathMatchPages(req, authPages) &&
                !doesPathMatchPages(req, publicPages)
            ) {
                return redirect(req, defaultAuthPage);
            }
            return intlMiddleware(req);
        }
        if (
            doesPathMatchPages(req, authPages) ||
            (doesPathMatchPages(req, blockedPages) && !token.isBlocked) ||
            (doesPathMatchPages(req, adminPages) && !token.isAdmin)
        ) {
            return redirect(req, defaultPublicPage);
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
    matcher: ["/((?!_next|.*\\..*).*)"],
};
