import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();


  if (pathname === "/doctor") {
    url.pathname = "/doctor/dashboard";
    return NextResponse.redirect(url);
}

if (pathname === "/admin") {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
}



    return NextResponse.next();
};

export const config = {
    matcher: ["/doctor/:path*", "/admin/:path*"],
};


