import { shouldRetry } from "@/api/errors/shouldRetry";
import { errorAlert, successAlert } from "@/packages/react-hot-toast";
import { openAuthModal } from "@/redux/features/auth";
import { dispatch } from "@/redux/store/store";
import { ResponseErrorType } from "@/types";
import {
  Mutation,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failCount, error) => shouldRetry({ failCount, error }),
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

type MutationType = Mutation<unknown, unknown, unknown, unknown>;

// * ------- queryClient helpers -------
function mutationErrorHandler(data: ResponseErrorType, mutation: MutationType) {
  const custom_message = mutation?.meta?.errorMessage;
  const server_message = !!data.message ? data.message : "اعملیات ناموفق";
  const message = custom_message ?? server_message;
  errorAlert(message);
}

function mutationSuccessHandler(mutation: MutationType) {
  const message = mutation?.meta?.successMessage ?? "عملیات با موفقیت انجام شد";
  if (!!mutation?.meta?.disableSuccessAlert) return;
  successAlert(message);
}

let authExpiredHandled = false;
function expiredAuthErrorHandler(err: ResponseErrorType) {
  if (authExpiredHandled) return;
  if (err?.status !== 401) return;
  authExpiredHandled = true;
  dispatch(openAuthModal());
}
function invalidatesHandler(mutation: MutationType) {
  const invalidates = mutation?.meta?.invalidates;
  if (!invalidates || !!!invalidates.length) return;

  invalidates.forEach((queryKey) =>
    queryClient.invalidateQueries({
      queryKey,
      refetchType: "active",
    }),
  );
}
