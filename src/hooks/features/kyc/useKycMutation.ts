import { kycBaseKey } from "@/packages/react-query";
import { ResponseErrorType } from "@/types";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

export function useKycMutation<
  TData = unknown,
  TError = ResponseErrorType,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: kycBaseKey,
        refetchType: "active",
      });
      options.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
