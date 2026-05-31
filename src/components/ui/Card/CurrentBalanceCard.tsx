import PanelPaper from "../Paper/PanelPaper";
import { Typography } from "@mui/material";
import { Price, PriceAmount, PriceUnit } from "../Typography/Price";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { cookies } from "next/headers";
import { walletBalance } from "@/api";
import { formatFaPrice } from "@/utils";

async function CurrentBalanceCard(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof PanelPaper>>,
) {
  const cookieStorage = await cookies();
  const balanceInfo = await walletBalance({
    headers: { cookie: cookieStorage.toString() },
  });

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
          {formatFaPrice(balanceInfo.balance)}
        </PriceAmount>
        <PriceUnit variant="body1" sx={{ color: "text.secondary" }} />
      </Price>
    </PanelPaper>
  );
}

export default CurrentBalanceCard;
