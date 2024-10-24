import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { routes } from "./lib/routes";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { geo } = request;
  if (request.nextUrl.pathname.startsWith(routes.api.qrCode.root)) {
    const headers = new Headers(request.headers);

    headers.set("country", geo?.country ?? "");
    headers.set("city", geo?.city ?? "");
    headers.set("region", geo?.region ?? "");
    headers.set("latitude", geo?.latitude ?? "");
    headers.set("longitude", geo?.longitude ?? "");

    return NextResponse.next({ headers: headers });
  }

  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;
    if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return response;
  }
  const originHeader = request.headers.get("Origin");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
