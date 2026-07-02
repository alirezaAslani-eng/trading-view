import { cancleOrderConfig } from "@/packages/react-query";
import { useMutation } from "@tanstack/react-query";

function useCancelOrderMutation() {
  return useMutation(cancleOrderConfig());
}

export default useCancelOrderMutation;
