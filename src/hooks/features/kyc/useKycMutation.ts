import {
  dashboardInfoKey,
  kycBaseKey,
  kycStatusKey,
} from "@/packages/react-query";
import { ResponseErrorType } from "@/types";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export function useKycMutation<
  TData = unknown,
  TError = ResponseErrorType,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation({
    ...options,
    meta: {
      invalidates: [kycStatusKey, dashboardInfoKey],
    },
  });
}
