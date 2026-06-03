import TradePanelPaper from "@/components/ui/Paper/TradePanelPaper";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Typography } from "@mui/material";
import type { ComponentProps } from "react";

interface AmountDisplayProps extends ReplaceSxWithSxOnlyObject<
  ComponentProps<typeof TradePanelPaper>
> {
  label: string;
  value: string;
}

export default function AmountDisplay({
  label,
  value,
  ...paperProps
}: AmountDisplayProps) {
  return (
    <TradePanelPaper
      {...paperProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: "8px",
        ...paperProps.sx,
      }}
    >
      <Typography
        variant="caption2"
        sx={{
          color: "text.disabled",
          mb: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.onPrimary",
        }}
      >
        {value}
      </Typography>
    </TradePanelPaper>
  );
}
