import { CancleOrderParam } from "@/api/types";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import useCancelOrderMutation from "@/hooks/features/order/useCancleOrder";
import React from "react";

const bounc_sx = { width: "4px" };
const bounc_container_sx = { gap: "4px" };
function CancleOrderTableAction({ orderId }: { orderId: CancleOrderParam }) {
  const cancleQuery = useCancelOrderMutation();
  const isCanceling = cancleQuery.isPending;
  return (
    <ButtonTableAction
      onClick={() => cancleQuery.mutate(orderId)}
      disabled={isCanceling}
    >
      {isCanceling ? (
        <BouncCircleLoader bounceSx={bounc_sx} sx={bounc_container_sx} />
      ) : (
        "لغو"
      )}
    </ButtonTableAction>
  );
}

export default React.memo(CancleOrderTableAction);
