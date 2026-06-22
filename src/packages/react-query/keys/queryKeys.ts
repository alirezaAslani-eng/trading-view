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
const walletProtfolioKey = [...authBaseKey, "wallet-portfolio"];

const productsKey = [...authBaseKey, "products"];
const productsDynamicKey = (productStatus: ProductStatus) => [
  ...productsKey,
  productStatus,
];

const productCategoriesKey = [...authBaseKey, "product-categories"];
const marketTickersKey = ["tickers"];
const marketTickerInfoKey = ["ticker-info"];
const marketTickerInfoDynamicKey = (tickerName: string) => [
  ...marketTickerInfoKey,
  tickerName,
];
const symbolsKey = ["symbols"];
const orderBookKey = [...authBaseKey, "order-book"];
const orderBookDynamicKey = (symbol: string) => [...orderBookKey, symbol];
export {
  kycStatusKey,
  dashboardInfoKey,
  banksKey,
  walletProtfolioKey,
  productCategoriesKey,
  productsKey,
  productsDynamicKey,
  marketTickersKey,
  symbolsKey,
  marketTickerInfoDynamicKey,
  marketTickerInfoKey,
  orderBookDynamicKey,
  orderBookKey,
};

// * prefix keys
export { authBaseKey, kycBaseKey };
