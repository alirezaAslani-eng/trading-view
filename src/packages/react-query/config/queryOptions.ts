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
  PermissionGroupsResponse,
} from "@/api/types";
import type {
  ResponseErrorType,
  OrderFilters,
  TransactionFilters,
} from "@/types";
import { queryOptions } from "@tanstack/react-query";
import {
  banksKey,
  dashboardInfoKey,
  kycStatusKey,
  productCategoriesKey,
  walletProtfolioKey,
  productsDynamicKey,
  symbolsKey,
  marketTickerInfoDynamicKey,
  orderBookDynamicKey,
  ordersDynamicKey,
  permissionGroupsKey,
  transactionsDynamicKey,
} from "@/packages/react-query";
import {
  orders,
  dashboardInfo,
  getBankAccounts,
  getProducts,
  kycStatus,
  marketTickerInfo,
  orderBook,
  productCategories,
  symbols,
  walletPortfolio,
  transactions,
} from "@/api";
import serializeQueries from "@/utils/app/serializeQueries";
import PermissionGroups from "@/api/permission/permission";

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
    queryKey: orderBookDynamicKey(symbol),
    queryFn: () => orderBook(symbol),
  });
};
const permissionGroupsConfig = () => {
  return queryOptions<PermissionGroupsResponse>({
    queryKey: permissionGroupsKey,
    queryFn: PermissionGroups,
  });
};
const ordersConfig = (filters: OrderFilters) => {
  return queryOptions({
    queryKey: ordersDynamicKey(filters),
    gcTime: 30000,
    queryFn: (query) => {
      const filters = query.queryKey[3] as OrderFilters;
      return orders({
        queries: serializeQueries(filters).toString(),
        params: {
          view: filters.view,
        },
      });
    },
  });
};
const transactionsConfig = (filters: TransactionFilters) => {
  return queryOptions({
    queryKey: transactionsDynamicKey(filters),
    gcTime: 30000,
    queryFn: (query) => {
      const filters = query.queryKey[3] as TransactionFilters;
      return transactions({
        queries: serializeQueries(filters).toString(),
      });
    },
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
  ordersConfig,
  transactionsConfig,
  permissionGroupsConfig,
};
