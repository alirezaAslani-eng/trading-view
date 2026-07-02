// react-query.d.ts

import "@tanstack/react-query";
import { ResponseErrorType } from "@/types";
import { QueryKey } from "@tanstack/react-query";

interface CustomMutationMeta extends Record<string, unknown> {
  successMessage?: string;
  errorMessage?: string;
  disableSuccessAlert?: boolean;
  invalidates?: QueryKey[];
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: CustomMutationMeta;
    defaultError: ResponseErrorType;
  }
}

export { CustomMutationMeta };
