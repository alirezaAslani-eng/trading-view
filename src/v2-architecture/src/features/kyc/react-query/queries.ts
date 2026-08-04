import { queryOptions } from "@tanstack/react-query";
import {
  addressInquiryDynamicKey,
  companyMembersDynamicKey,
  kycProgressKey,
  workspacesKey,
} from "./keys";
import {
  addressInquiry,
  companyMembers,
  kycProgress,
  workspaces,
} from "../api";
import kycL2Schema from "@/validations/kyc/kycL2Schema";

export const kycProgressConfig = () =>
  queryOptions({
    queryKey: kycProgressKey,
    queryFn: ({ signal }) => {
      return kycProgress({ signal });
    },
  });

export const workspacesConfig = () =>
  queryOptions({
    queryKey: workspacesKey,
    queryFn: ({ signal }) => {
      return workspaces({ signal });
    },
  });

export const companyMembersConfig = (companyId: string) =>
  queryOptions({
    queryKey: companyMembersDynamicKey(companyId),
    queryFn: ({ signal }) => {
      return companyMembers({ signal, params: { id: companyId } });
    },
  });

// --- queries.ts (addition) --

export const addressInquiryConfig = (postalCode: string) =>
  queryOptions({
    queryKey: addressInquiryDynamicKey(postalCode),
    enabled: kycL2Schema.shape.postalCode.safeParse(postalCode).success,
    gcTime: 0,
    queryFn: ({ signal }) => {
      return addressInquiry({ signal, params: { postalCode } });
    },
  });

const activityFields = [
  { value: "فناوری اطلاعات", label: "فناوری اطلاعات" },
  { value: "مالی و حسابداری", label: "مالی و حسابداری" },
  { value: "پزشکی و سلامت", label: "پزشکی و سلامت" },
  { value: "آموزش", label: "آموزش" },
  { value: "سایر", label: "سایر" },
] as const;
export const activityFieldsConfig = () =>
  queryOptions({
    queryKey: ["activity-fields"],
    queryFn: () => activityFields,
  });
