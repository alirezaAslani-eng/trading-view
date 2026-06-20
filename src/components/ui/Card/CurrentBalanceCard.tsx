"use client";
import PanelPaper from "../Paper/PanelPaper";
import { Skeleton, Typography } from "@mui/material";
import { Price, PriceAmount, PriceUnit } from "../Typography/Price";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { formatFaPrice } from "@/utils";
import useIRTAssetQuery from "@/hooks/features/wallet/useIRTAssetQuery";

function CurrentBalanceCard(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof PanelPaper>>,
) {
  const query = useIRTAssetQuery();
  const isSuccessQuery = query.status === "success";
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
            {formatFaPrice(query.data?.availableBalance)}
          </PriceAmount>
          <PriceUnit variant="body1" sx={{ color: "text.secondary" }} />
        </Price>
      )}
    </PanelPaper>
  );
}

export default CurrentBalanceCard;
