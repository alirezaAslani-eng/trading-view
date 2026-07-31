import { queryOptions } from "@tanstack/react-query";
import {
  companyMembersDynamicKey,
  kycProgressKey,
  workspacesKey,
} from "./keys";
import { companyMembers, kycProgress, workspaces } from "../api";

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
