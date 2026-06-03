import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import { ToggleButton } from "@mui/material";
import { ComponentProps } from "react";

interface TradeToggleButtonProps extends ComponentProps<
  typeof ToggleButtonGroup
> {
  value?: "sell" | "buy";
}
function TradeToggleButton(props: TradeToggleButtonProps) {
  return (
    <ToggleButtonGroup size="large" color="success" {...props}>
      <ToggleButton value={"buy"}>{"خرید"}</ToggleButton>
      <ToggleButton
        value={"sell"}
        sx={({ palette }) => ({
          "&.Mui-selected": {
            backgroundColor: `${palette.background.sell} !important`,
          },
        })}
      >
        {"فروش"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TradeToggleButton;
