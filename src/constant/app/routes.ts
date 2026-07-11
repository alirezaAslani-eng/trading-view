export const ROUTES = {
  HOME: "/",

  PANEL: {
    ROOT: "/panel",
  },

  MARKET: {
    ROOT: "/panel/market",
  },

  AUTH: {
    ROOT: "/auth",
    VERIFY: "/auth/verify",
  },

  TRADE: {
    BY_SYMBOL: (symbol: string) => `/panel/trade/${symbol}`,
  },

  ASSETS: {
    ROOT: "/panel/assets",
    WITHDRAW: "/panel/assets/withdraw",
    DEPOSIT: "/panel/assets/deposit",
  },

  PROFILE: {
    OVERIVIEW: "/panel/profile/overview",
    BANKS: "/panel/profile/banks",
  },

  PRODUCTS: {
    ROOT: "/admin/products",
  },

  PERMISSIONS: {
    ROOT: "/admin/permissions/admin",
    BYGROUP_ID: (id: string | number) => `/admin/permissions/${id}`,
  },

  HISTORY: {
    ROOT: "/panel/history",
  },

  ADMIN: {
    ROOT: "/admin",
  },
  ERROR: {
    BY_CODE: (code:number) => `/error/${code}`,
  },
} as const;

// Optional: derive a union type of all static string routes
type ExtractStrings<T> = T extends string
  ? T
  : T extends (...args: any[]) => string
    ? never
    : { [K in keyof T]: ExtractStrings<T[K]> }[keyof T];

export type RoutePath = ExtractStrings<typeof ROUTES>;
