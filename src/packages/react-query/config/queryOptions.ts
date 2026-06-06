import {
  BankAccountsResponse,
  DashboardInfoResponse,
  KycStatusResponse,
  ProductsResponse,
  ProductCategoriesResponse,
  WalletBalanceResponse,
} from "@/api/types";
import type { ResponseErrorType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import {
  banksKey,
  dashboardInfoKey,
  kycStatusKey,
  productsKey,
  productCategoriesKey,
  walletInfoKey,
} from "@/packages/react-query";
import {
  dashboardInfo,
  getBankAccounts,
  getProducts,
  kycStatus,
  productCategories,
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
  return queryOptions<
    ProductsResponse,
    ResponseErrorType,
    ProductsResponse,
    typeof productsKey
  >({
    queryKey: productsKey,
    queryFn: async () => {
      const res = await getProducts();
      return res;
    },
  });
};

export {
  kycStatusConfig,
  dashboardInfoConfig,
  bankAccountsConfig,
  walletBalanceConfig,
  productsConfig,
  productCategoriesConfig,
};
