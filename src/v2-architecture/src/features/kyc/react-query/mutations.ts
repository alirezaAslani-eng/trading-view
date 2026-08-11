import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import {
  companyMembersKey,
  kycL3Key,
  kycProgressKey,
  workspacesKey,
} from "./keys";
import {
  addCompanyMember,
  AddCompanyMemberVariables,
  createCompany,
  CreateCompanyVariables,
  kycL3,
  KycL3Variables,
  kycMergeAccount,
  KycMergeAccountVariables,
  removeCompanyMember,
  RemoveCompanyMemberParams,
  switchToPersonal,
  switchWorkSpace,
  SwitchWorkSpaceVariables,
} from "../api";
import {
  dashboardInfoKey,
  kycStatusKey,
  queryClient,
} from "@/packages/react-query";

export const kycL3Config = createMutationOptions({
  mutationKey: kycL3Key,
  meta: {
    successMessage: "احراز سطح 3 شما ثبت شد",
    invalidates: [kycStatusKey, kycProgressKey, dashboardInfoKey],
  },
  mutationFn: (vars: KycL3Variables) => {
    return kycL3({ body: vars });
  },
});

export const createCompanyConfig = createMutationOptions({
  mutationFn: (vars: CreateCompanyVariables) => {
    return createCompany({ body: vars });
  },
  meta: {
    successMessage: "حساب حقوقی با موفقیت ایجاد شد",
    invalidates: [workspacesKey],
  },
});

export const addCompanyMemberConfig = createMutationOptions({
  mutationFn: (vars: AddCompanyMemberVariables) => {
    return addCompanyMember({ body: vars });
  },
  meta: {
    successMessage: "عضو جدید با موفقیت اضافه شد",
    invalidates: [companyMembersKey],
  },
});

export const removeCompanyMemberConfig = createMutationOptions({
  meta: {
    successMessage: "عضو با موفقیت حذف شد",
    invalidates: [companyMembersKey],
  },
  mutationFn: (params: RemoveCompanyMemberParams) => {
    return removeCompanyMember({ params });
  },
});

export const kycMergeAccountConfig = createMutationOptions({
  mutationFn: (vars: KycMergeAccountVariables) => {
    return kycMergeAccount({ body: vars });
  },
  // OPTIMIZE : reset only the needed chaches !
  onSuccess() {
    queryClient.resetQueries();
  },
});

//#region // * ------------ Account Switching Mutations ------------
// ! ARCH : There is DRY in `onSuccess` & query invalidation
export const switchWorkSpaceConfig = createMutationOptions({
  meta: {
    successMessage: "حساب حقوقی با موفقیت تغییر کرد",
    invalidates: [workspacesKey],
  },
  // OPTIMIZE : Dont clear the whole cache
  onSuccess: () => {
    queryClient.resetQueries({
      predicate(query) {
        return query.queryKey?.[0] !== workspacesKey?.[0];
      },
    });
  },
  mutationFn: (vars: SwitchWorkSpaceVariables) => {
    return switchWorkSpace({ body: vars });
  },
});
// ! ARCH : There is DRY in `onSuccess` & query invalidation
export const switchToPersonalConfig = createMutationOptions({
  meta: {
    successMessage: "به حساب حقیقی بازگشتید",
    invalidates: [workspacesKey],
  },
  mutationFn: () => switchToPersonal(),
  onSuccess() {
    queryClient.resetQueries({
      predicate(query) {
        return query.queryKey?.[0] !== workspacesKey?.[0];
      },
    });
  },
});
//#endregion // * ------------ Account Switching Mutations ------------
