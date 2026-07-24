import { queryOptions } from "@tanstack/react-query";
import { kycStatus } from "../api";
import { kycStatusKey } from "./keys";


export const kycStatusConfig = () => {
  return queryOptions({
    queryKey: kycStatusKey,
    queryFn: ({ signal }) => {
      return kycStatus({ signal });
    },
  });
};