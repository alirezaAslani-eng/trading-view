import { cancleOrderConfig, ordersKey } from "@/packages/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCancelOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...cancleOrderConfig(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ordersKey });
    },
  });
}

export default useCancelOrderMutation;
