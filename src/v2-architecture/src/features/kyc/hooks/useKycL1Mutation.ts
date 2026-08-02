import { kycL1, KycL1Data, KycL1Variables } from "@/api";
import safeAsync from "@/utils/app/safeAsync";
import {
  DefaultError,
  MutateOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { isKycMergeAccountError, kycMergeAccount } from "../api";
import { show } from "@ebay/nice-modal-react";
import { GenericConfirmDialog } from "@/packages/nice-modal-react";
import { apiError } from "@/v2-architecture/src/api";
import { ROUTES } from "@/constant/app/routes";
import { kycProgressKey } from "../react-query/keys";
import {
  dashboardInfoKey,
  kycLevel1Key,
  kycStatusKey,
} from "@/packages/react-query";

type useKycL1MutationOptions = Pick<
  UseMutationOptions<KycL1Data, DefaultError, KycL1Variables>,
  "onSuccess"
>;

const meta = {
  invalidates: [kycStatusKey, dashboardInfoKey, kycProgressKey],
};

export function useKycL1Mutation(options: useKycL1MutationOptions = {}) {
  const router = useRouter();

  return useMutation({
    meta,
    mutationKey: kycLevel1Key,
    onSuccess: options.onSuccess,
    mutationFn: async (vars: KycL1Variables) => {
      const kycL1_res = await safeAsync(() => kycL1({ body: vars }));
      if (!kycL1_res.ok) {
        if (!isKycMergeAccountError(kycL1_res.error)) throw kycL1_res.error;
        const isConfirm = await show(GenericConfirmDialog, {
          color: "primary",
          title: "نیاز به ادغام حساب کاربری",
          description:
            "این شماره موبایل قبلاً برای حساب دیگری که با همین کد ملی ثبت شده استفاده شده است. آیا می‌خواهید اطلاعات آن حساب به حساب فعلی منتقل شود؟",
        });
        apiError.throwError(!isConfirm, {
          message: "برای احراز نیاز به ادغام حساب هست",
        });

        await kycMergeAccount({
          body: { nationalId: vars.nationalId },
        });
        router.replace(ROUTES.AUTH.ROOT);
      }
    },
  });
}
