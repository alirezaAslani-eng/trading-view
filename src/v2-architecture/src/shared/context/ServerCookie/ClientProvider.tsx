"use client";
import { createContext, PropsWithChildren, useContext } from "react";

type CookieValue = Record<string, string>;

const CookieContext = createContext<CookieValue>({});

type CookieProviderProps = PropsWithChildren<{
  cookies: CookieValue;
}>;

export function CookiesProvider({ cookies, children }: CookieProviderProps) {
  return <CookieContext value={cookies}>{children}</CookieContext>;
}

export function useCookie(key: string): string | null {
  const cookies = useContext(CookieContext);
  return cookies[key] ?? null;
}
