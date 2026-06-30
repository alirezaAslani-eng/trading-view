import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./constant/app/routes";
import { jwtDecode } from "jwt-decode";
import safeAsync from "./utils/app/safeAsync";
import { refrehAuthToken } from "@/api";
// * ------------- Page Path -------------

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // * ------ Tokens ------
  const refresh_token = request.cookies.get(REFRESH_TOKEN)?.value;

  // * ------ which middleware state ------
  const isAuthMiddleware = pathname.startsWith(ROUTES.PANEL.ROOT);

  // * ------ Auth Protection ------
  if (isAuthMiddleware) {
    if (!!refresh_token) return NextResponse.next();
    return NextResponse.redirect(new URL(ROUTES.AUTH.ROOT, request.url));
  }

  return NextResponse.next();
}

async function getValidAccessToken(
  request: NextRequest,
): Promise<string | null> {
  const refresh_token = request.cookies.get(REFRESH_TOKEN)?.value;
  const access_token = request.cookies.get(ACCESS_TOKEN)?.value;

  if (access_token) return access_token;

  if (!refresh_token) {
    return null;
  }

  const refreshed = await safeAsync(async () => {
    return refrehAuthToken({
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    });
  });

  if (!refreshed.ok) {
    // ! Report Log
    console.log(
      "Middleware couldn't refresh the access token",
      refreshed.error,
    );
    return null;
  }

  return refreshed.data.token;
}
