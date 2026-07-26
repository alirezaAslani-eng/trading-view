import { CancleOrderParam } from "@/api/types";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import useCancelOrderMutation from "@/hooks/features/order/useCancleOrder";
import React, { ComponentProps } from "react";

const bounc_sx = { width: "4px" };
const bounc_container_sx = { gap: "4px" };

interface CancleOrderTableActionProps
  extends Omit<ComponentProps<typeof ButtonTableAction>, "onClick"> {
  orderId: CancleOrderParam;
}
function CancleOrderTableAction({
  orderId,
  ...props
}: CancleOrderTableActionProps) {
  const cancleQuery = useCancelOrderMutation();
  const isCanceling = cancleQuery.isPending;
  return (
    <ButtonTableAction
      {...props}
      onClick={() => cancleQuery.mutate(orderId)}
      disabled={props?.disabled || isCanceling}
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
