import { CancleOrderParam } from "@/api/types";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import { cancleOrderConfig } from "@/packages/react-query";
import { useMutation } from "@tanstack/react-query";
import React, { ComponentProps } from "react";

const bounc_sx = { width: "4px" };
const bounc_container_sx = { gap: "4px" };

interface CancleOrderTableActionProps extends Omit<
  ComponentProps<typeof ButtonTableAction>,
  "onClick"
> {
  orderId: CancleOrderParam;
}
const mutationConfig = cancleOrderConfig();
function CancleOrderTableAction({
  orderId,
  ...props
}: CancleOrderTableActionProps) {
  const cancleQuery = useMutation(mutationConfig);
  const { isDemo } = useTradeMode();
  const isCanceling = cancleQuery.isPending;
  return (
    <ButtonTableAction
      {...props}
      onClick={() => cancleQuery.mutate({ orderId, isDemo })}
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
