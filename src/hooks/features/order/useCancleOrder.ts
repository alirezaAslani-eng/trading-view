import { OrdersResponse } from "@/api/types";
import { ORDER_STATUS } from "@/constant/features/order/orderStatus";
import { cancleOrderConfig, ordersKey } from "@/packages/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCancelOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...cancleOrderConfig(),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ordersKey });

      const previousOrders = queryClient.getQueriesData<OrdersResponse>({
        queryKey: ordersKey,
      });

      queryClient.setQueriesData<OrdersResponse>(
        { queryKey: ordersKey },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.map((item) =>
              item.orderId === variables
                ? { ...item, status: ORDER_STATUS.Cancelled }
                : item,
            ),
          };
        },
      );

      return { previousOrders };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(ordersKey, context.previousOrders);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ordersKey });
    },
  });
}

export default useCancelOrderMutation;
