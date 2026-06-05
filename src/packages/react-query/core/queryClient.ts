import { errorAlert, successAlert } from "@/packages/react-hot-toast";
import { dispatch } from "@/redux/store/store";
import { ResponseErrorType } from "@/types";
import {
  Mutation,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess(data, variables, onMutateResult, mutation, context) {
      mutationSuccessHandler(mutation);
    },
    onError(data, variables, onMutateResult, mutation, context) {
      mutationErrorHandler(data, mutation);
    },
  }),
  queryCache: new QueryCache({
    onError(error, query) {},
  }),
});

export default queryClient;

// * ------- queryClient helpers -------
function mutationErrorHandler(
  data: ResponseErrorType,
  mutation: Mutation<unknown, unknown, unknown, unknown>,
) {
  const custom_message = mutation?.meta?.errorMessage;
  const server_message = data.message ?? "اعملیات ناموفق";
  const message = custom_message ?? server_message;
  errorAlert(message);
}

function mutationSuccessHandler(
  mutation: Mutation<unknown, unknown, unknown, unknown>,
) {
  const message = mutation?.meta?.successMessage ?? "عملیات با موفقیت انجام شد";
  if (!!mutation?.meta?.disableSuccessAlert) return;
  successAlert(message);
}
