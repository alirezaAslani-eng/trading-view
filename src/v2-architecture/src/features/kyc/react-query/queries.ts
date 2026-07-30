import { queryOptions } from "@tanstack/react-query";
import { kycProgressKey, workspacesKey } from "./keys";
import { kycProgress, workspaces } from "../api";

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
