import { errorAlert, successAlert } from "@/packages/react-hot-toast";
import { MutationCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess(data, variables, onMutateResult, mutation, context) {
      const message =
        mutation?.meta?.successMessage ?? "عملیات با موفقیت انجام شد";
      if (!!!mutation?.meta?.disableSuccessAlert) {
        successAlert(message);
      }
    },
    onError(data, variables, onMutateResult, mutation, context) {
      const custom_message = mutation?.meta?.errorMessage;
      const server_message = data.message ?? "اعملیات ناموفق";
      const message = custom_message ?? server_message;
      errorAlert(message);
    },
  }),
});

export default queryClient;
