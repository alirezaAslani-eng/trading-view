"use client";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { USER_TIER_LOYALITY_LABEL } from "@/v2-architecture/src/features/loyalty/constants";
import { loyaltyRulesConfig } from "@/v2-architecture/src/features/loyalty/react-query";
import Button from "@/components/ui/Button/Button";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";
import { LoyaltyRulesData } from "../api";
import { formatFaPrice } from "@/utils";

function LoyaltyRules() {
  //#region // * ------------ Data : Loyalty Rules ------------
  const { data, isLoading, isError } = useQuery(loyaltyRulesConfig());
  //#endregion // * ------------ Data : Loyalty Rules ------------

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: 2.5 }}>
        <PagePaperTitle>قوانین سطوح وفاداری</PagePaperTitle>
      </PagePaperHeading>

      {isLoading && (
        <Typography variant="body3" sx={{ color: "text.tertiary" }}>
          {"در حال بارگذاری..."}
        </Typography>
      )}

      {isError && (
        <Typography variant="body3" sx={{ color: "status.loss" }}>
          {"دریافت اطلاعات با خطا مواجه شد"}
        </Typography>
      )}

      {!isLoading && !isError && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 2,
          }}
        >
          {data?.map((rule) => (
            <TierRuleCard key={rule.tierName} rule={rule} />
          ))}
        </Box>
      )}
    </PagePaper>
  );
}

export default LoyaltyRules;

type TierRuleCardProps = {
  rule: LoyaltyRulesData[number];
};

function TierRuleCard({ rule }: TierRuleCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "border.secondary",
        borderRadius: 2,
        backgroundColor: "background.surfaceTertiary",
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h7"
              sx={{
                color: "text.heading",
              }}
            >
              {USER_TIER_LOYALITY_LABEL[rule.tierName]}
            </Typography>

            <Typography
              variant="body4"
              sx={{
                display: "block",
                mt: 0.25,
                color: "text.tertiary",
              }}
            >
              {rule.tierName}
            </Typography>
          </Box>
          <NextLink href={ROUTES.ADMIN.LOYALTY_INFO(rule.tierName)}>
            <Button variant="outlined" size="small">
              ویرایش
            </Button>
          </NextLink>
        </Box>

        {/* Rules */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "border.secondary",
          }}
        >
          <RuleValue
            label="حداقل حجم معاملات"
            value={formatFaPrice(rule.minVolumeKg)}
            unit={WEIGHT_UNITS.KG.lable}
          />

          <RuleValue label="نرخ کارمزد" value={`${rule.feeRate}%`} />
        </Box>
      </Stack>
    </Box>
  );
}

type RuleValueProps = {
  label: string;
  value: string | number;
  unit?: string;
};

function RuleValue({ label, value, unit }: RuleValueProps) {
  return (
    <Box>
      <Typography
        variant="body4"
        sx={{
          color: "text.tertiary",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 0.5,
          mt: 0.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.heading",
          }}
        >
          {value}
        </Typography>

        {unit && (
          <Typography
            variant="body4"
            sx={{
              color: "text.tertiary",
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
