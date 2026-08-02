"use client";
import { kycL1, addShaba, enableDemo, KycL1Variables } from "@/api";
import addCard from "@/api/bank/addcard";
import { deposit } from "@/api";
import addgroup from "@/api/group/addGroup";
import assignPermissions from "@/api/permission/assignPermissions";
import logout from "@/api/auth/logout";
import {
  addProduct,
  cancleOrder,
  deleteBankAccount,
  deleteProduct,
  kycL2,
  placeOrder,
  requestAuthOTP,
  verifyAuthOTP,
  withdraw,
} from "@/api";
import {
  DefaultError,
  MutationMeta,
  QueryKey,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  addCardKey,
  addGroupKey,
  addProductKey,
  addShabaKey,
  assignPermissionsKey,
  cancleOrderKey,
  deleteBankKey,
  deleteProductKey,
  depositKey,
  enableDemoKey,
  kycLevel1Key,
  kycLevel2Key,
  logoutKey,
  placeOrderKey,
  requestAuthOTPKey,
  verifyAuthOTPKey,
  withdrawKey,
} from "@/packages/react-query/keys/mutationKeys";
import {
  authBaseKey,
  banksKey,
  dashboardInfoKey,
  kycStatusKey,
  permissionGroupsKey,
  permissionListKey,
  productsKey,
  symbolsKey,
  transactionsKey,
} from "../keys/queryKeys";
import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";
import { kycProgressKey } from "@/v2-architecture/src/features/kyc/react-query/keys";
import safeAsync from "@/utils/app/safeAsync";
import { kycMergeAccount } from "@/v2-architecture/src/features/kyc/api";
import { show } from "@ebay/nice-modal-react";
import { GenericConfirmDialog } from "@/packages/nice-modal-react";
import { apiError } from "@/v2-architecture/src/api";
import queryClient from "../core/queryClient";

const requestAuthOTPConfig = createMutationOptions({
  mutationKey: requestAuthOTPKey,
  mutationFn: requestAuthOTP,
});

const verifyAuthOTPConfig = createMutationOptions({
  mutationKey: verifyAuthOTPKey,
  mutationFn: verifyAuthOTP,
  onSuccess: () => TradeModeStore.clearStore(),
  meta: {
    invalidates: [authBaseKey],
    disableSuccessAlert: true,
  },
});

// REFACTOR : This mutation option might makes bugs or it may be refactord to a beetter structure because it has certain dependencies
const kycLevel1Config = createMutationOptions({
  mutationKey: kycLevel1Key,
  mutationFn: async (vars: KycL1Variables) => {
    const kycL1_res = await safeAsync(() => kycL1({ body: vars }));
    if (!kycL1_res.ok) {
      if (true) {
        const isConfirm = await show(GenericConfirmDialog, {
          color: "primary",
          title: "نیاز به ادغام حساب کاربری",
          description:
            "این شماره موبایل قبلاً برای حساب دیگری که با همین کد ملی ثبت شده استفاده شده است. آیا می‌خواهید اطلاعات آن حساب به حساب فعلی منتقل شود؟",
        });
        apiError.throwError(!isConfirm, {
          message: "برای احراز نیاز به ادغام حساب هست",
        });
        return kycMergeAccount({
          body: { nationalId: vars.nationalId },
        });
      }
    }
  },
  meta: {
    invalidates: [kycStatusKey, dashboardInfoKey, kycProgressKey],
  },
});

const kycLevel2Config = createMutationOptions({
  mutationKey: kycLevel2Key,
  mutationFn: kycL2,
  meta: {
    invalidates: [kycStatusKey, dashboardInfoKey, kycProgressKey],
  },
});

const addCardConfig = createMutationOptions({
  mutationKey: addCardKey,
  mutationFn: addCard,
  meta: {
    invalidates: [banksKey],
  },
});

const addShabaConfig = createMutationOptions({
  mutationKey: addShabaKey,
  mutationFn: addShaba,
  meta: {
    invalidates: [banksKey],
  },
});

const deleteBankConfig = createMutationOptions({
  mutationKey: deleteBankKey,
  mutationFn: deleteBankAccount,
  meta: {
    invalidates: [banksKey],
  },
});

const withdrawConfig = createMutationOptions({
  mutationKey: withdrawKey,
  mutationFn: withdraw,
  meta: {
    invalidates: [transactionsKey],
  },
});

const depositConfig = createMutationOptions({
  mutationKey: depositKey,
  mutationFn: deposit,
  meta: {
    invalidates: [transactionsKey],
  },
});

const addProductConfig = createMutationOptions({
  mutationKey: addProductKey,
  mutationFn: addProduct,
  meta: {
    invalidates: [productsKey, symbolsKey],
  },
});

const addGroupConfig = createMutationOptions({
  mutationKey: addGroupKey,
  mutationFn: addgroup,
  meta: {
    invalidates: [permissionGroupsKey],
  },
});

const placeOrderConfig = createMutationOptions({
  mutationKey: placeOrderKey,
  mutationFn: placeOrder,
  meta: {
    invalidates: [transactionsKey],
  },
});

const cancleOrderConfig = createMutationOptions({
  mutationKey: cancleOrderKey,
  mutationFn: cancleOrder,
  meta: {
    invalidates: [transactionsKey],
    successMessage: "سفارش باموفقیت لغو شد",
  },
});

const deletProductConfig = createMutationOptions({
  mutationKey: deleteProductKey,
  mutationFn: deleteProduct,
  meta: {
    invalidates: [productsKey, symbolsKey],
    successMessage: "محصول با موفقیت حذف شد",
  },
});

const assignPermissionsConfig = createMutationOptions({
  mutationKey: assignPermissionsKey,
  mutationFn: assignPermissions,
  meta: {
    invalidates: [permissionListKey],
  },
});

const logoutConfig = createMutationOptions({
  mutationKey: logoutKey,
  mutationFn: logout,

  onSuccess: () => {
    //#region // * ----------------------
    // FTD : `auth` imports `trade`
    // ARCH : This piec of code has DRY
    TradeModeStore.clearStore();
    queryClient.resetQueries();
    //#endregion // * ----------------------
  },
  meta: {
    disableSuccessAlert: true,
  },
});

const enableDemoConfig = createMutationOptions({
  mutationKey: enableDemoKey,
  mutationFn: enableDemo,
  meta: {
    successMessage: "حساب دمو فعلا شد",
  },
});
export {
  requestAuthOTPConfig,
  logoutConfig,
  verifyAuthOTPConfig,
  kycLevel1Config,
  kycLevel2Config,
  addCardConfig,
  addShabaConfig,
  deleteBankConfig,
  withdrawConfig,
  depositConfig,
  addProductConfig,
  addGroupConfig,
  placeOrderConfig,
  cancleOrderConfig,
  deletProductConfig,
  assignPermissionsConfig,
  enableDemoConfig,
};

type AppMutationOptions<
  TData,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "meta"> & {
  meta?: MutationMeta;
  extraInvalidates?: QueryKey[];
};

function createMutationOptions<
  TData,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(base: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const overridableMutation = (
    overrides: AppMutationOptions<TData, TError, TVariables, TContext> = {},
  ): UseMutationOptions<TData, TError, TVariables, TContext> => {
    return {
      ...base,
      ...overrides,

      meta: {
        ...base.meta,
        ...overrides.meta,

        invalidates: [
          ...(base.meta?.invalidates ?? []),
          ...(overrides.extraInvalidates ?? []),
        ],
      },

      onSuccess: async (...args) => {
        await base.onSuccess?.(...args);
        await overrides.onSuccess?.(...args);
      },

      onError: async (...args) => {
        await base.onError?.(...args);
        await overrides.onError?.(...args);
      },

      onSettled: async (...args) => {
        await base.onSettled?.(...args);
        await overrides.onSettled?.(...args);
      },

      onMutate: async (...args) => {
        const baseContext = await base.onMutate?.(...args);
        const overrideContext = await overrides.onMutate?.(...args);

        return overrideContext ?? (baseContext as TContext);
      },
    };
  };
  return overridableMutation;
}
