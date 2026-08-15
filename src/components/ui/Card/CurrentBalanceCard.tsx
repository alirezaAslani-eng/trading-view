"use client";
import PanelPaper from "../Paper/PanelPaper";
import { Skeleton, Typography } from "@mui/material";
import { Price, PriceAmount, PriceUnit } from "../Typography/Price";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { formatFaPrice } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useTradeMode } from "@/context/feature/trade/TradeMode";

function CurrentBalanceCard(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof PanelPaper>>,
) {
  const { isDemo } = useTradeMode();
  const query = useQuery(walletPortfolioConfig(isDemo));
  const isSuccessQuery = query.isSuccess;
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
      {!isSuccessQuery && <Skeleton animation="pulse" sx={{ width: "90px" }} />}

      {isSuccessQuery && (
        <Price sx={{ gap: "10px" }}>
          <PriceAmount variant="h6" sx={{ color: "text.heading" }}>
            {formatFaPrice(query.data.availableCash)}
          </PriceAmount>
          <PriceUnit variant="body1" sx={{ color: "text.secondary" }} />
        </Price>
      )}
    </PanelPaper>
  );
}

export default CurrentBalanceCard;
