import PanelPaper from "../Paper/PanelPaper";
import { Typography } from "@mui/material";
import { Price, PriceAmount, PriceUnit } from "../Typography/Price";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

function CurrentBalanceCard(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof PanelPaper>>,
) {
  return (
    <PanelPaper
      {...props}
      sx={{
        px: "16px",
        py: "20px",
        width: "100%",
        display: "flex",
        minHeight: "74px",
        justifyContent: "space-between",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <Typography variant="h7" sx={{ color: "text.heading" }}>
        {"موجودی کیف پول:"}
      </Typography>
      <Price sx={{ gap: "10px" }}>
        <PriceAmount variant="h6" sx={{ color: "text.heading" }}>
          {"12.840.500.000"}
        </PriceAmount>
        <PriceUnit variant="body1" sx={{ color: "text.secondary" }} />
      </Price>
    </PanelPaper>
  );
}

export default CurrentBalanceCard;
