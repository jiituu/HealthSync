import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const verifyToken = (token?: string): boolean => {
    if (!token) return false;

    try {
        jwt.verify(token, 'asdasdasd');
        return true; // Token is valid
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return false; // Token is invalid or expired
    }
};

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone();
    const token = req.cookies.get("token")?.value;
    const isVerified = verifyToken(token);

    // if(!isVerified){

    //     url.pathname = "/"
    //     return NextResponse.redirect(url);
    // }
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


