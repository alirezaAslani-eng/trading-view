"use client";
import React from "react";
import { Typography, IconButton, Stack, Skeleton } from "@mui/material";
import { ArrowUpDownIcon, HistoryIcon, ReceiveIcon, SendIcon } from "./ui/Icon";
import { PagePaper } from "./ui/Layout/PaperLayout";
import { Price, PriceAmount, PriceUnit } from "./ui/Typography/Price";
import { formatFaPrice, getTrendColor } from "@/utils";
import { Grid } from "@mui/system";
import NextLink from "./ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { defaultSymbol } from "@/constant/features/trading/symbol";
import { useQuery } from "@tanstack/react-query";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import { getWalletPortfolioData } from "@/api/wallet/walletPortfolio";

const actionStackSx = {
  alignItems: "center",
  gap: 1,
  cursor: "pointer",
};

const actionIconButtonSx = {
  width: 66,
  height: 46,
  borderRadius: "32px",
  border: "1px solid",
  borderColor: "border.default",
};

const actionLabelSx = {
  color: "text.onPrimary",
};

const portfolioValueStackSx = {
  mb: "38px",
};

const portfolioValueContentSx = {
  gap: "12px",
};

const portfolioTextSx = {
  color: "text.onPrimary",
};

const actionsContainerSx = {
  justifyContent: "center",
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function ActionButton({ icon, label, href }: ActionButtonProps) {
  return (
    <NextLink href={href}>
      <Stack sx={actionStackSx}>
        <IconButton sx={actionIconButtonSx}>{icon}</IconButton>

        <Typography variant="body2" sx={actionLabelSx}>
          {label}
        </Typography>
      </Stack>
    </NextLink>
  );
}

export function PortfolioSummary() {
  const { isDemo } = useTradeMode();

  //#region // * ------------ Data ------------
  const portfolioQuery = useQuery(walletPortfolioConfig(isDemo));
  const { isSuccess, data } = portfolioQuery;
  const { totalPortfolioValueIrt, totalProfitLoss24hIrt } =
    getWalletPortfolioData(data);
  //#endregion

  return (
    <PagePaper>
      <Stack sx={portfolioValueStackSx}>
        <Stack sx={portfolioValueContentSx}>
          <Typography variant="body2" sx={portfolioTextSx}>
            ارزش کل دارایی
          </Typography>

          {!isSuccess && <Skeleton variant="text" width={200} />}

          {isSuccess && (
            <Price>
              <PriceAmount variant="h5">
                {formatFaPrice(totalPortfolioValueIrt)}
              </PriceAmount>

              <PriceUnit variant="body2" />
            </Price>
          )}
        </Stack>

        {!isSuccess && <Skeleton variant="text" width={150} />}

        {isSuccess && (
          <Price sx={{ color: getTrendColor(0.5) }}>
            <PriceAmount variant="body2">
              {formatFaPrice(totalProfitLoss24hIrt)}
            </PriceAmount>

            <PriceUnit variant="body2" />
          </Price>
        )}
      </Stack>

      {/* Bottom section: action buttons */}
      <Stack direction="row" sx={actionsContainerSx}>
        <Grid container spacing={4}>
          <Grid size={3}>
            <ActionButton
              href={ROUTES.ASSETS.DEPOSIT}
              icon={<ReceiveIcon fontSize="medium" />}
              label="واریز"
            />
          </Grid>

          <Grid size={3}>
            <ActionButton
              href={ROUTES.ASSETS.WITHDRAW}
              icon={<SendIcon fontSize="medium" />}
              label="برداشت"
            />
          </Grid>

          <Grid size={3}>
            <ActionButton
              href={ROUTES.TRADE.BY_SYMBOL(defaultSymbol)}
              icon={<ArrowUpDownIcon fontSize="medium" />}
              label="معامله"
            />
          </Grid>

          <Grid size={3}>
            <ActionButton
              href={ROUTES.HISTORY.ROOT}
              icon={<HistoryIcon fontSize="medium" />}
              label="تاریخچه"
            />
          </Grid>
        </Grid>
      </Stack>
    </PagePaper>
  );
}
