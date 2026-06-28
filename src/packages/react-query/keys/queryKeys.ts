import { ProductStatus } from "@/api/types";
import { OrderFilters, TransactionFilters } from "@/types";

const cacheDomain = {
  auth: "auth",
  kyc: "kyc",
  trade: "trade",
  permission:"permission",
  transaction: "transaction",
} as const;

const authBaseKey = [cacheDomain.auth];
const kycBaseKey = [cacheDomain.auth, cacheDomain.kyc];
const TradeBaseKey = [cacheDomain.auth, cacheDomain.trade];
const PermissionBaseKey = [cacheDomain.auth, cacheDomain.permission];
const TransactionKey = [cacheDomain.auth, cacheDomain.transaction];

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

const ordersKey = [...TradeBaseKey, "orders"];
const ordersDynamicKey = (filters: OrderFilters) => [...ordersKey, filters];
const permissionGroupsKey=[...PermissionBaseKey,"groups"]

const transactionsKey = [...TransactionKey, "transactions"];
const transactionsDynamicKey = (filters: TransactionFilters) => [
  ...ordersKey,
  filters,
];
export {
  kycStatusKey,
  dashboardInfoKey,
  banksKey,
  walletProtfolioKey,
  productCategoriesKey,
  productsKey,
  permissionGroupsKey,
  productsDynamicKey,
  marketTickersKey,
  symbolsKey,
  marketTickerInfoDynamicKey,
  marketTickerInfoKey,
  orderBookDynamicKey,
  ordersDynamicKey,
  orderBookKey,
  ordersKey,
  transactionsKey,
  transactionsDynamicKey,
};

// * prefix keys
export { authBaseKey, kycBaseKey };

function QueryFilterKey<TFilters extends object | null | undefined = object>(
  filters: TFilters,
):
  | (TFilters & {
      queryFilter: true;
    })
  | null {
  if (!filters) return null;

  const signedFilters = structuredClone(filters) as TFilters & {
    queryFilter: true;
  };
  signedFilters.queryFilter = true;

  return signedFilters;
}
