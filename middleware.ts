import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone();
    const token = req.cookies.get("token")?.value;

    // auth middleware
    // if (!token) {
    //     url.pathname = "/";
    //     return NextResponse.redirect(url);
    // }

    // if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // if (!token && req.nextUrl.pathname.startsWith("/doctor")) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // if (!token && req.nextUrl.pathname.startsWith("/patient")) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // redirect to dashboard
    if (pathname === "/doctor") {
        url.pathname = "/doctor/dashboard";
        return NextResponse.redirect(url);
    }

    if (pathname === "/admin") {
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
    }


    if (pathname === "/patient") {
        url.pathname = "/patient/dashboard";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/doctor/:path*", "/admin/:path*", "/patient/:path*"],
};


