import serializeQueries from "@/utils/app/serializeQueries";
import PermissionGroups from "@/api/permission/permissionGroups";
import permissionChecklist from "@/api/permission/permissionChecklist";
import { queryOptions } from "@tanstack/react-query";
import { ProductStatus } from "@/api/types";
import type { OrderFilters, TransactionFilters } from "@/types";
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
  userPermissionsDynamicKey,
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
    queryFn: async () => {
      const res = await dashboardInfo();
      return res;
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
const walletPortfolioConfig = () => {
  return queryOptions({
    queryKey: walletProtfolioKey,
    queryFn: walletPortfolio,
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
    queryKey: marketTickerInfoDynamicKey(tickerName),
    refetchOnMount: "always", // * Because signalr updates only the active ticker
    queryFn: () => marketTickerInfo(tickerName),
  });
};
const orderBookConfig = (symbol: string) => {
  return queryOptions({
    queryKey: orderBookDynamicKey(symbol),
    refetchOnMount: "always", // * Because signalr updates only the active ticker
    queryFn: () => orderBook(symbol),
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

const ordersConfig = (filters: OrderFilters) => {
  return queryOptions({
    queryKey: ordersDynamicKey(filters),
    queryFn: () => {
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
    queryFn: () => {
      return transactions({
        queries: serializeQueries(filters).toString(),
      });
    },
  });
};
const userPermissonsConfig = (userID: string) => {
  return queryOptions({
    queryKey: userPermissionsDynamicKey(userID),
    queryFn: () => {
      return transactions({
        queries: serializeQueries(userID).toString(),
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
  userPermissonsConfig,
};
