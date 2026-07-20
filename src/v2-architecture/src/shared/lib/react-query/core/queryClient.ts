import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { apiError } from "@/api";
import {
  expiredAuthErrorHandler,
  invalidatesHandler,
  mutationErrorHandler,
  mutationSuccessHandler,
} from "./helpers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failCount, error) => apiError.shouldRetry({ failCount, error }),
      gcTime: 60_000 * 2,
      staleTime: 80_000,
    },
  },
  mutationCache: new MutationCache({
    onSuccess(data, variables, onMutateResult, mutation, context) {
      mutationSuccessHandler(mutation);
      invalidatesHandler(mutation);
    },
    onError(err, variables, onMutateResult, mutation, context) {
      mutationErrorHandler(err, mutation);
      expiredAuthErrorHandler(err);
    },
  }),
  queryCache: new QueryCache({
    onError(err) {
      expiredAuthErrorHandler(err);
    },
  }),
});

export default queryClient;
