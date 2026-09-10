import PermissionGroups from "@/api/permission/permissionGroups";
import permissionChecklist from "@/api/permission/permissionChecklist";
import { queryOptions } from "@tanstack/react-query";
import { ProductStatus } from "@/api/types";
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
  permissionChecklistDynamicKey,
  recentTradesDynamicKey,
  walletProtfolioDynamicKey,
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
  OrderBookParams,
  OrderBookQuerieParams,
  TransactionsQueryParams,
  OrdersQueryParams,
} from "@/api";
import recentTrades from "@/api/trading/recentTrade";

const kycStatusConfig = () => {
  return queryOptions({
    queryKey: kycStatusKey,
    queryFn: async () => {
      const res = await kycStatus();
      return res;
    },
  });
};

const dashboardInfoConfig = () => {
  return queryOptions({
    queryKey: dashboardInfoKey,
    queryFn: ({ signal }) => {
      return dashboardInfo({ signal });
    },
  });
};
const bankAccountsConfig = () => {
  return queryOptions({
    queryKey: banksKey,
    queryFn: async () => {
      const res = await getBankAccounts();
      return res;
    },
  });
};

const productCategoriesConfig = () => {
  return queryOptions({
    queryKey: productCategoriesKey,
    queryFn: async () => {
      const res = await productCategories();
      return res;
    },
  });
};

const productsConfig = () => {
  return queryOptions({
    queryKey: productsDynamicKey("null"),
    queryFn: async (query) => {
      const productStatus = query.queryKey[2] as ProductStatus;
      const res = await getProducts({ queries: { isActive: productStatus } });
      return res;
    },
  });
};
const symbolsConfig = () => {
  return queryOptions({
    queryKey: symbolsKey,
    queryFn: symbols,
  });
};
const marketTickerInfoConfig = (tickerName: string) => {
  return queryOptions({
    enabled: !!tickerName,
    queryKey: marketTickerInfoDynamicKey(tickerName),
    staleTime: Infinity,
    queryFn: () => marketTickerInfo(tickerName),
  });
};
const orderBookConfig = (filters: OrderBookParams & OrderBookQuerieParams) => {
  const { symbol, settlementMode, isdemo } = filters;
  return queryOptions({
    // Infinity because SignalR is responsible for real-time updates
    staleTime: Infinity,
    queryKey: orderBookDynamicKey(filters),
    queryFn: ({ signal }) =>
      orderBook({
        signal,
        params: { symbol },
        queryParams: { settlementMode, isdemo },
      }),
  });
};
const permissionGroupsConfig = () => {
  return queryOptions({
    queryKey: permissionGroupsKey,
    queryFn: PermissionGroups,
  });
};

export const permissionChecklistConfig = (groupId: string | number) => {
  return queryOptions({
    queryKey: permissionChecklistDynamicKey(groupId),
    queryFn: () => permissionChecklist(groupId),
  });
};

//#region // * ------------ Apis that depends on isDemo query ------------
const walletPortfolioConfig = (isdemo: boolean) => {
  return queryOptions({
    queryKey: walletProtfolioDynamicKey(isdemo),
    queryFn: ({ signal }) => {
      return walletPortfolio({
        queryParams: { isdemo },
        signal,
      });
    },
  });
};

const ordersConfig = (filters: OrdersQueryParams) => {
  return queryOptions({
    queryKey: ordersDynamicKey(filters),
    queryFn: ({ signal }) => {
      return orders({
        queryParams: filters,
        signal,
      });
    },
  });
};
const transactionsConfig = (filters: TransactionsQueryParams) => {
  return queryOptions({
    queryKey: transactionsDynamicKey(filters),
    queryFn: ({ signal }) => {
      return transactions({
        signal,
        queryParams: filters,
      });
    },
  });
};
//#endregion // * ------------ Apis that depends on isDemo query ------------

const recentTradesConfig = (symbol: string) => ({
  queryKey: recentTradesDynamicKey(symbol),
  queryFn: () => recentTrades(symbol),
});

export {
  kycStatusConfig,
  recentTradesConfig,
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
