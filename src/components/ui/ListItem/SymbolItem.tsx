"use client";
import {
  Box,
  ButtonBase,
  ButtonBaseProps,
  styled,
  Typography,
} from "@mui/material";
import { Price, PriceAmount, PriceUnit } from "../Typography/Price";
import { formatFaPrice } from "@/utils";

const SymbolItemButton = styled(ButtonBase)(({ theme }) => {
  const { palette } = theme;
  return {
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "14px 10px",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: palette.text.onPrimary,
    "&.Mui-selected": {
      backgroundColor: palette.background.surfaceLevel5,
    },
  };
});

interface SymbolItemProps extends ButtonBaseProps {
  symbolInfo?: any;
  selected?: boolean;
}

function SymbolItem({ symbolInfo, selected, ...props }: SymbolItemProps) {
  const isPositive = true;

  return (
    <SymbolItemButton {...props} className={selected ? "Mui-selected" : ""}>
      <Typography variant="body2">{"نام نماد"}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Price sx={{ gap: "4px" }}>
          <PriceAmount variant="body2">{formatFaPrice(34000)}</PriceAmount>
          <PriceUnit variant="body4" />
        </Price>
        <Typography
          variant="body3"
          sx={{ color: isPositive ? "text.profit" : "status.loss" }}
        >
          {`24%`}
        </Typography>
      </Box>
    </SymbolItemButton>
  );
}

export default SymbolItem;
