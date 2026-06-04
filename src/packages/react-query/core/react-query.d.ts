// react-query.d.ts

import { ResponseErrorType } from "@/types";
import "@tanstack/react-query";

interface MutationMeta extends Record<string, unknown> {
  successMessage?: string;
  errorMessage?: string;
  disableSuccessAlert?: boolean;
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: MutationMeta;
    defaultError: ResponseErrorType;
  }
}
