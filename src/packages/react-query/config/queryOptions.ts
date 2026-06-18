import {
  BankAccountsResponse,
  DashboardInfoResponse,
  KycStatusResponse,
  ProductsResponse,
  ProductCategoriesResponse,
  WalletBalanceResponse,
  ProductStatus,
  SymbolsResponse,
} from "@/api/types";
import type { ResponseErrorType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import {
  banksKey,
  dashboardInfoKey,
  kycStatusKey,
  productCategoriesKey,
  walletInfoKey,
  productsDynamicKey,
  symbolsKey,
} from "@/packages/react-query";
import {
  dashboardInfo,
  getBankAccounts,
  getProducts,
  kycStatus,
  productCategories,
  symbols,
  walletBalance,
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
const walletBalanceConfig = () => {
  return queryOptions<
    WalletBalanceResponse,
    ResponseErrorType,
    WalletBalanceResponse,
    typeof walletInfoKey
  >({
    queryKey: walletInfoKey,
    queryFn: async () => {
      const res = await walletBalance();
      return res;
    },
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

export {
  kycStatusConfig,
  dashboardInfoConfig,
  bankAccountsConfig,
  walletBalanceConfig,
  productsConfig,
  productCategoriesConfig,
  symbolsConfig,
};
