import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./constant/app/routes";
import retry from "./api/errors/retry";
// * ------------- Page Path -------------

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // * ------ Tokens ------
  const refresh_token = request.cookies.get(REFRESH_TOKEN)?.value;
  const access_token = request.cookies.get(ACCESS_TOKEN)?.value;

  // * ------ which middleware state ------
  const isPanelRoute = pathname.startsWith(ROUTES.PANEL.ROOT);
  const isAuthRoute = pathname.startsWith(ROUTES.AUTH.ROOT);

  // * ------ Panel Pages Protection ------
  if (isPanelRoute) {
    if (access_token) {
      return NextResponse.next();
    }

    if (!refresh_token) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.ROOT, request.url));
    }

    //#region // * ------------ Refresh Auth Token ------------
    // try {
    //   const res = await retry(() =>
    //     fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/refresh`, {
    //       method: "POST",
    //       headers: {
    //         cookie: request.headers.get("cookie") ?? "",
    //       },
    //     }),
    //   );

    //   if (!res.ok) {
    //     const status = res.status;
    //     console.log("Middleware : Access token couldn't be refreshed", res);

    //     if (status >= 500) {
    //       return NextResponse.redirect(
    //         new URL(ROUTES.ERROR.BY_CODE(status), request.url),
    //       );
    //     }

    //     if (status === 401) {
    //       return NextResponse.redirect(new URL(ROUTES.AUTH.ROOT, request.url));
    //     }

    //     return NextResponse.redirect(
    //       new URL(ROUTES.ERROR.BY_CODE(status), request.url),
    //     );
    //   }
    //   const response = NextResponse.next();
    //   response.headers.set("set-cookie", res.headers.get("set-cookie") ?? "");
    //   return response;
    // } catch {
    //   return NextResponse.redirect(
    //     new URL(ROUTES.ERROR.BY_CODE(500), request.url),
    //   );
    // }
    //#endregion // * ------------ Refresh Auth Token ------------
  }

  // * ------ Auth Pages protection ------
  if (isAuthRoute) {
    if (!!!refresh_token) return NextResponse.next();
    return NextResponse.redirect(new URL(ROUTES.PANEL.ROOT, request.url));
  }

  return NextResponse.next();
}
