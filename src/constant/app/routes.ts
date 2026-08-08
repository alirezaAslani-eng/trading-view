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
    SIGNUP: "/auth/signup",
    SIGNIN: "/auth/signin",
  },

  TRADE: {
    ROOT: "/panel/trade",
    BY_SYMBOL: (symbol: string) => `/panel/trade/${symbol}`,
  },

  ASSETS: {
    ROOT: "/panel/assets",
    WITHDRAW: "/panel/assets/withdraw",
    DEPOSIT: "/panel/assets/deposit",
  },

  PROFILE: {
    ROOT: "/panel/profile",
    OVERIVIEW: "/panel/profile/overview",
    BANKS: "/panel/profile/banks",
    COMPANIES: "/panel/profile/companies",
    LOYALTY: "/panel/profile/loyalty",
  },
  ROBOT: {
    ROOT: "/admin/robot",
    ROBOT_CONFIG: (symbol: string) => `/admin/robot/${symbol}`,
  },
  COMPANIES: {
    ROOT: "/panel/profile/companies",
    COMPANY_INFO: (id: number | string) => `/panel/profile/companies/${id}`,
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
    DEMO_SETTING: "/admin/demo-setting",
    LOYALTY_SETTING: "/admin/loyalty-rules",
  },
  ERROR: {
    BY_CODE: (code: number) => `/error/${code}`,
  },
} as const;

// Optional: derive a union type of all static string routes
type ExtractStrings<T> = T extends string
  ? T
  : T extends (...args: any[]) => string
    ? never
    : { [K in keyof T]: ExtractStrings<T[K]> }[keyof T];

export type RoutePath = ExtractStrings<typeof ROUTES>;
