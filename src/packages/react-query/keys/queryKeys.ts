import { ProductStatus } from "@/api/types";

const cacheDomain = {
  auth: "auth",
  kyc: "kyc",
} as const;

const authBaseKey = [cacheDomain.auth];
const kycBaseKey = [cacheDomain.auth, cacheDomain.kyc];

const kycStatusKey = [...kycBaseKey, "status" as const];
const dashboardInfoKey = [...kycBaseKey, "dashboard-info" as const];
const banksKey = [...authBaseKey, "banks"];
const walletInfoKey = [...authBaseKey, "wallet-info"];

const productsKey = [...authBaseKey, "products"];
const productsDynamicKey = (productStatus: ProductStatus) => [
  ...productsKey,
  productStatus,
];

const productCategoriesKey = [...authBaseKey, "product-categories"];
const marketTickersKey = ["tickers"];
const marketTickerInfoKey = ["ticker-info"];
const symbolsKey = ["symbols"];
export {
  kycStatusKey,
  dashboardInfoKey,
  banksKey,
  walletInfoKey,
  productCategoriesKey,
  productsKey,
  productsDynamicKey,
  marketTickersKey,
  symbolsKey,
  marketTickerInfoKey,
};

// * prefix keys
export { authBaseKey, kycBaseKey };
