"use client";
import Button from "@/components/ui/Button/Button";
import { ReceiveIcon, SendIcon } from "@/components/ui/Icon";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import NextLink from "@/components/ui/Link/NextLink";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { ROUTES } from "@/constant/app/routes";
import { walletPortfolioConfig } from "@/packages/react-query";
import { formatFaPrice } from "@/utils";
import extractIRTAsset from "@/utils/features/order/extractIRTAsset";
import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const queryConfig = walletPortfolioConfig();

function TotalAssetCard() {
  const portofolioQuery = useQuery(queryConfig);

  const isSuccessQuery = portofolioQuery.isSuccess;

  const irtAsset = extractIRTAsset(portofolioQuery.data);
  return (
    <PagePaper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "62px",
        height: "100%",
      }}
    >
      <PagePaperHeading sx={{ alignItems: "start" }}>
        <Stack sx={{ gap: "12px" }}>
          <PagePaperTitle>{"ارزش کل دارایی"}</PagePaperTitle>
          {!isSuccessQuery && (
            <Skeleton variant="text" height={"40px"} width={"200px"} />
          )}
          {isSuccessQuery && (
            <Price sx={{ gap: "10px", color: "text.heading" }}>
              <PriceAmount variant="h5">
                {formatFaPrice(portofolioQuery.data?.totalPortfolioValueIrt)}
              </PriceAmount>
              <PriceUnit variant="body1" />
            </Price>
          )}
        </Stack>
      </PagePaperHeading>

      <Box
        sx={{
          display: "flex",
          gap: "61px",
          alignItems: "center",
          px: "10px",
          py: "6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack sx={{ gap: "4px" }}>
            <Typography variant="button2" sx={{ color: "text.caption" }}>
              {"موجودی نقد آزاد"}
            </Typography>

            {!isSuccessQuery && <Skeleton variant="text" height={"27px"} />}
            {isSuccessQuery && (
              <Price>
                <PriceAmount>
                  {formatFaPrice(irtAsset?.availableBalance)}
                </PriceAmount>
                <PriceUnit />
              </Price>
            )}
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "border.default", mx: "32px" }}
          />

          <Stack sx={{ gap: "4px" }}>
            <Typography variant="button2" sx={{ color: "text.caption" }}>
              {"سود/ضرر 24 ساعته"}
            </Typography>
            <Price sx={{ color: "text.profit" }}>
              <PriceAmount>{"1.700.000"}</PriceAmount>
              <PriceUnit />
              <Typography variant="button2">{"1.4%"}</Typography>
            </Price>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flex: 1,
          }}
        >
          <NextLink href={ROUTES.ASSETS.DEPOSIT} sx={{ flex: 1 }}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ gap: "2px", px: "4px" }}
            >
              <ReceiveIcon />
              {"واریز"}
            </Button>
          </NextLink>
          <NextLink href={ROUTES.ASSETS.WITHDRAW} sx={{ flex: 1 }}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ gap: "2px", px: "4px" }}
            >
              <SendIcon />
              {"برداشت"}
            </Button>
          </NextLink>
        </Box>
      </Box>
    </PagePaper>
  );
}

export default TotalAssetCard;
