import { RouteHandler } from "@/types";
import { cookies } from "next/headers";
const refreshTokenUrl = `${process.env.SOURCE_BASEURL}/api/v1/auth/refresh`;

const refreshToken = async (Cookie: string): Promise<Response> => {
  let refreshRes: Response;

  try {
    refreshRes = await fetch(refreshTokenUrl, {
      method: "POST",
      headers: { Cookie },
    });
  } catch (err) {
    throw err; // ! refresh network error forward
  }

  return refreshRes;
};

const forwardFetch = async (url: URL | string, req: Request) => {
  return fetch(url, {
    method: req.method,
    body: req.body,
    headers: req.headers,
    //@ts-ignore
    duplex: "half",
  });
};

const handler: RouteHandler<string[]> = async (req, context) => {
  const params = await context.params;

  // * Preserve the original query string (?page=1&pageSize=10&productCode=REBAR)
  const incomingUrl = new URL(req.url);
  const url = createProxyUrl(`/${params.path.join("/")}${incomingUrl.search}`);

  const reqCookies = await cookies();

  req.headers.set("Cookie", reqCookies.toString());

  if (reqCookies.get("access_token")) {
    let res: Response;
    try {
      res = await forwardFetch(url, req);
    } catch (err) {
      console.log({ ForwardFetch: err });
      return gateWayResponse(err);
    }
    return response(res);
  }

  // * ------------- Refresh Token -------------
  let refreshRes: Response;

  try {
    refreshRes = await refreshToken(reqCookies.toString());
  } catch (err) {
    console.log({ RefreshTokenRes: err });
    return gateWayResponse(err);
  }

  if (!refreshRes?.ok) {
    return response(refreshRes);
  }

  const updatedCookies = refreshRes.headers.get("set-cookie") as string;

  // * ------------- Main Request -------------
  req.headers.set("Cookie", updatedCookies);
  let res: Response;
  try {
    res = await forwardFetch(url, req);
  } catch (err) {
    console.log({ FetchAfterRefresh: err });
    return gateWayResponse(err);
  }
  const headers = new Headers(res.headers);
  headers.set("set-cookie", updatedCookies);
  return new Response(res.body, {
    headers,
    status: res.status,
    statusText: res.statusText,
  });
};

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

function response(res: Response): Response {
  return new Response(res.body, {
    // * Wrapped in `new Headers()` — some runtimes return an immutable
    // * Headers object from `fetch`, and setting on it later throws.
    headers: new Headers(res.headers),
    status: res.status,
    statusText: res.statusText,
  });
}

function gateWayResponse(err: unknown) {
  reportLog("502 Error -> ", err);
  return Response.json(
    { message: "مشکلی رخ داده است", details: err },
    { status: 502 },
  );
}

function createProxyUrl(path: string): URL {
  return new URL(path, process.env.SOURCE_BASEURL!);
}

function reportLog(...error: any) {
  console.log("ERROR ----- >", error);
}
