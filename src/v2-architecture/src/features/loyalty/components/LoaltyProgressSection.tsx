"use client";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import { USER_TIER_LOYALITY_LABEL } from "../constants";
import { formatFaPrice, formatPrecent } from "@/utils";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";
import { useQuery } from "@tanstack/react-query";
import { loyaltyProgressConfig } from "../react-query";
import InputText from "@/components/ui/Input/InputText";
import Button from "@/components/ui/Button/Button";
import LoyaltyRules from "./LoyaltyRules";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";

function formatFeeRate(value: number) {
  return formatPrecent(value, { signDisplay: "never" });
}

export default function LoaltyProgressSection() {
  //#region // * ------------ Data :Loyalty Progress ------------
  const loyaltyProgressQuery = useQuery(loyaltyProgressConfig());
  if (!loyaltyProgressQuery.isSuccess) return null;
  const { currentTier, currentFeeRate, volume30Days, nextTier, chartData } =
    loyaltyProgressQuery.data;
  //#endregion // * ------------ Data :Loyalty Progress ------------

  //#region // * ------------ Referall Code State ------------
  const isAlreadyRefered = false;
  //#endregion // * ------------ Referall Code State ------------
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* Overview */}
      <PagePaper>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h7" sx={{ color: "text.heading" }}>
              سطح وفاداری شما
            </Typography>

            <Typography
              variant="body3"
              sx={{
                mt: 0.5,
                color: "text.tertiary",
              }}
            >
              با افزایش حجم معاملات خود به سطوح بالاتر بروید و از کارمزد
              معاملاتی کمتری بهره‌مند شوید.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
            }}
          >
            <InfoItem
              label="سطح فعلی"
              value={USER_TIER_LOYALITY_LABEL[currentTier]}
            />

            <InfoItem
              label="کارمزد معاملات"
              value={formatFeeRate(currentFeeRate)}
            />

            <InfoItem label="حجم معاملات ۳۰ روز اخیر">
              <Price>
                <PriceAmount>{formatFaPrice(volume30Days)}</PriceAmount>
                <PriceUnit>{WEIGHT_UNITS.KG.lable}</PriceUnit>
              </Price>
            </InfoItem>
          </Box>
        </Stack>
      </PagePaper>

      {/* Progress */}
      <PagePaper>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography variant="h7" sx={{ color: "text.heading" }}>
                پیشرفت سطح وفاداری
              </Typography>

              <Typography
                variant="body3"
                sx={{
                  mt: 0.5,
                  color: "text.tertiary",
                }}
              >
                {nextTier
                  ? "با افزایش حجم معاملات ۳۰ روز اخیر به سطح بعدی نزدیک شوید."
                  : "شما به بالاترین سطح وفاداری رسیده‌اید."}
              </Typography>
            </Box>

            <Typography variant="h7" sx={{ color: "text.primary" }}>
              {chartData.progressPercentage}%
            </Typography>
          </Box>

          <Stack spacing={1.25}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.heading" }}>
                {USER_TIER_LOYALITY_LABEL[currentTier]}
              </Typography>

              {!!nextTier && (
                <Typography variant="body2" sx={{ color: "text.heading" }}>
                  {USER_TIER_LOYALITY_LABEL[nextTier.name]}
                </Typography>
              )}
            </Box>

            <LinearProgress
              variant="determinate"
              value={chartData.progressPercentage}
              sx={{
                height: 8,
                borderRadius: 10,
                backgroundColor: "background.surfaceLevel4",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 10,
                  backgroundColor: "primary.main",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Price>
                <PriceAmount variant="caption1" sx={{ color: "text.tertiary" }}>
                  {formatFaPrice(chartData.min)}
                </PriceAmount>

                <PriceUnit variant="caption1" sx={{ color: "text.tertiary" }}>
                  {WEIGHT_UNITS.KG.lable}
                </PriceUnit>
              </Price>

              <Price>
                <PriceAmount variant="caption1" sx={{ color: "text.tertiary" }}>
                  {formatFaPrice(chartData.max)}
                </PriceAmount>

                <PriceUnit variant="caption1" sx={{ color: "text.tertiary" }}>
                  {WEIGHT_UNITS.KG.lable}
                </PriceUnit>
              </Price>
            </Box>
          </Stack>

          {!!nextTier && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.surfaceTertiary",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body3" sx={{ color: "text.secondary" }}>
                  حجم باقی‌مانده تا سطح{" "}
                  {USER_TIER_LOYALITY_LABEL[nextTier.name]}
                </Typography>

                <Price>
                  <PriceAmount>
                    {formatFaPrice(nextTier.remainingVolume)}
                  </PriceAmount>

                  <PriceUnit>{WEIGHT_UNITS.KG.lable}</PriceUnit>
                </Price>
              </Stack>
            </Box>
          )}

          {/* Current volume */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: "background.surfaceTertiary",
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body3" sx={{ color: "text.secondary" }}>
                حجم فعلی
              </Typography>

              <Price>
                <PriceAmount>{formatFaPrice(chartData.current)}</PriceAmount>

                <PriceUnit>{WEIGHT_UNITS.KG.lable}</PriceUnit>
              </Price>
            </Stack>
          </Box>
        </Stack>
      </PagePaper>

      {/* Next Tier */}
      {!!nextTier && (
        <PagePaper>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h7" sx={{ color: "text.heading" }}>
                مزایای سطح بعدی
              </Typography>

              <Typography
                variant="body3"
                sx={{
                  mt: 0.5,
                  color: "text.tertiary",
                }}
              >
                با رسیدن به سطح {USER_TIER_LOYALITY_LABEL[nextTier.name]}،
                کارمزد معاملات شما کاهش پیدا می‌کند.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <BenefitItem
                label="سطح بعدی"
                value={USER_TIER_LOYALITY_LABEL[nextTier.name]}
              />

              <BenefitItem
                label="کارمزد در این سطح"
                value={formatFeeRate(nextTier.nextFeeRate)}
              />
            </Box>

            <Box sx={{ pt: 2.5 }}>
              {isAlreadyRefered ? (
                <Typography variant="body1" sx={{ color: "text.disabled" }}>
                  {"کد معرف شما:"} {"234876HJU"}
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.heading" }}>
                      کد معرف دارید؟
                    </Typography>

                    <Typography
                      variant="body3"
                      sx={{
                        mt: 0.5,
                        color: "text.tertiary",
                      }}
                    >
                      کد معرف خود را وارد کنید تا در سطح وفاداری شما اعمال شود.
                    </Typography>
                  </Box>

                  <Stack
                    direction={"row"}
                    sx={{ alignItems: "center", gap: 2 }}
                  >
                    <InputText
                      sx={{ maxWidth: "400px" }}
                      placeholder="کد معرف را وارد کنید"
                    />
                    <Button variant="on-surface" sx={{ flexShrink: 0 }}>
                      {"ثبت کد معرف"}
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Box>
          </Stack>
        </PagePaper>
      )}
      <LoyaltyRules />
    </Stack>
  );
}

type InfoItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

function InfoItem({ label, value, children }: InfoItemProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.surfaceTertiary",
      }}
    >
      <Typography variant="body3" sx={{ color: "text.tertiary" }}>
        {label}
      </Typography>

      {children ?? (
        <Typography
          variant="h6"
          sx={{
            mt: 0.75,
            color: "text.heading",
          }}
        >
          {value}
        </Typography>
      )}
    </Box>
  );
}

type BenefitItemProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function BenefitItem({ label, value, highlight = false }: BenefitItemProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.surfaceTertiary",
      }}
    >
      <Typography variant="body3" sx={{ color: "text.tertiary" }}>
        {label}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mt: 0.75,
          color: highlight ? "text.primary" : "text.heading",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
