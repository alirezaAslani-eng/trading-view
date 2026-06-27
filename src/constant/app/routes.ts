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
  },
} as const;

// Optional: derive a union type of all static string routes
type ExtractStrings<T> = T extends string
  ? T
  : T extends (...args: any[]) => string
    ? never
    : { [K in keyof T]: ExtractStrings<T[K]> }[keyof T];

export type RoutePath = ExtractStrings<typeof ROUTES>;
