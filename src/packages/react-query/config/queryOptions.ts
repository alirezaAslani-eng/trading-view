import {
  BankAccountsResponse,
  DashboardInfoResponse,
  KycStatusResponse,
  ProductsResponse,
  ProductCategoriesResponse,
  WalletPortfolioResponse,
  ProductStatus,
  SymbolsResponse,
  MarketTicker,
  OrderBookResponse,
} from "@/api/types";
import type { ResponseErrorType } from "@/types";
import { QueryOptions, queryOptions } from "@tanstack/react-query";
import {
  banksKey,
  dashboardInfoKey,
  kycStatusKey,
  productCategoriesKey,
  walletProtfolioKey,
  productsDynamicKey,
  symbolsKey,
  marketTickerInfoDynamicKey,
  orderBookKey,
} from "@/packages/react-query";
import {
  dashboardInfo,
  getBankAccounts,
  getProducts,
  kycStatus,
  marketTickerInfo,
  orderBook,
  productCategories,
  symbols,
  walletPortfolio,
} from "@/api";

const kycStatusConfig = () => {
  return queryOptions<
    KycStatusResponse,
    ResponseErrorType,
    KycStatusResponse,
    typeof kycStatusKey
  >({
    queryKey: kycStatusKey,
    queryFn: async () => {
      const res = await kycStatus();
      return res;
    },
  });
};

const dashboardInfoConfig = () => {
  return queryOptions<
    DashboardInfoResponse,
    ResponseErrorType,
    DashboardInfoResponse,
    typeof dashboardInfoKey
  >({
    queryKey: dashboardInfoKey,
    queryFn: async () => {
      const res = await dashboardInfo();
      return res;
    },
  });
};
const bankAccountsConfig = () => {
  return queryOptions<
    BankAccountsResponse,
    ResponseErrorType,
    BankAccountsResponse,
    typeof banksKey
  >({
    queryKey: banksKey,
    queryFn: async () => {
      const res = await getBankAccounts();
      return res;
    },
  });
};
const walletPortfolioConfig = () => {
  return queryOptions<
    WalletPortfolioResponse,
    ResponseErrorType,
    WalletPortfolioResponse,
    typeof walletProtfolioKey
  >({
    queryKey: walletProtfolioKey,
    queryFn: walletPortfolio,
  });
};
const productCategoriesConfig = () => {
  return queryOptions<
    ProductCategoriesResponse,
    ResponseErrorType,
    ProductCategoriesResponse,
    typeof productCategoriesKey
  >({
    queryKey: productCategoriesKey,
    queryFn: async () => {
      const res = await productCategories();
      return res;
    },
  });
};

const productsConfig = () => {
  return queryOptions<ProductsResponse, ResponseErrorType, ProductsResponse>({
    queryKey: productsDynamicKey("null"),
    queryFn: async (query) => {
      const productStatus = query.queryKey[2] as ProductStatus;
      const res = await getProducts({ queries: { isActive: productStatus } });
      return res;
    },
  });
};
const symbolsConfig = () => {
  return queryOptions<SymbolsResponse, ResponseErrorType, SymbolsResponse>({
    queryKey: symbolsKey,
    queryFn: symbols,
  });
};
const marketTickerInfoConfig = (tickerName: string) => {
  return queryOptions<MarketTicker, ResponseErrorType, MarketTicker>({
    queryKey: marketTickerInfoDynamicKey(tickerName),
    queryFn: () => marketTickerInfo(tickerName),
  });
};
const orderBookConfig = (symbol: string) => {
  return queryOptions<OrderBookResponse, ResponseErrorType, OrderBookResponse>({
    queryKey: orderBookKey(symbol),
    queryFn: () => orderBook(symbol),
  });
};

export {
  kycStatusConfig,
  dashboardInfoConfig,
  bankAccountsConfig,
  walletPortfolioConfig,
  productsConfig,
  productCategoriesConfig,
  symbolsConfig,
  marketTickerInfoConfig,
  orderBookConfig,
};
