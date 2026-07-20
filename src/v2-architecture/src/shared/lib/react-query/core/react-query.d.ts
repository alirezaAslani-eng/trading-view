// react-query.d.ts
import { ResponseError } from "@/api";
import "@tanstack/react-query";
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
    defaultError: ResponseError;
  }
}

export { CustomMutationMeta };
