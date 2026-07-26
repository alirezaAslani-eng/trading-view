import { queryOptions } from "@tanstack/react-query";
import { kycProgressKey } from "./keys";
import { kycProgress } from "../api";

export const kycProgressConfig = () =>
  queryOptions({
    queryKey: kycProgressKey,
    queryFn: ({ signal }) => {
      return kycProgress({ signal });
    },
  });
