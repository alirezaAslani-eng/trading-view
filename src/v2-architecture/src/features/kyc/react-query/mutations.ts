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
  removeCompanyMember,
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

export const switchWorkSpaceConfig = createMutationOptions({
  meta: { successMessage: "حساب حقوقی با موفقیت تغییر کرد" },
  // OPTIMIZE : Dont clear the whole cache
  onSuccess: () => queryClient.invalidateQueries(),
  mutationFn: (vars: SwitchWorkSpaceVariables) => {
    return switchWorkSpace({ body: vars });
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
  mutationFn: (id: string) => {
    return removeCompanyMember({ params: { id } });
  },
});
