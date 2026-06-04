import { MutationCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess(data, variables, onMutateResult, mutation, context) {
      const message =
        mutation?.meta?.successMessage ?? "عملیات با موفقیت انجام شد";
      if (!!!mutation?.meta?.disableSuccessAlert) {
        toast.success(message);
      }
    },
    onError(data, variables, onMutateResult, mutation, context) {
      const custom_message = mutation?.meta?.errorMessage;
      const server_message = data.message ?? "اعملیات ناموفق";
      const message = custom_message ?? server_message;
      toast.error(message);
    },
  }),
});

export default queryClient;
