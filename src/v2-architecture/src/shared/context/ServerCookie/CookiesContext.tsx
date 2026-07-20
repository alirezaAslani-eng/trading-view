"use server";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { CookiesProvider } from "./ClientProvider";

const EXCLUDED_COOKIES = ["access_token", "refresh_token"];

export async function ServerCookieProvider({ children }: PropsWithChildren) {
  const cookieStore = await cookies();

  const cookieValues = cookieStore
    .getAll()
    .reduce<Record<string, string>>((acc, cookie) => {
      if (!EXCLUDED_COOKIES.includes(cookie.name)) {
        acc[cookie.name] = cookie.value;
      }

      return acc;
    }, {});

  return <CookiesProvider cookies={cookieValues}>{children}</CookiesProvider>;
}
