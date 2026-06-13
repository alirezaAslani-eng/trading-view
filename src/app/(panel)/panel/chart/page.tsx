"use client";

import { useState } from "react";
import PageHeader from "@/components/common/Appbar/PageHeader";
import Button from "@/components/ui/Button/Button";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import BulletText from "@/components/ui/BulletItem/BulletText";
import { AreaLineChart } from "@/components/ui/Chart";
import { DashedLine } from "@/components/ui/Icon";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  Header,
  Main,
  Page,
  Section,
} from "@/components/ui/Layout/PageLayout";
import { PagePaperTitle } from "@/components/ui/Layout/PaperLayout";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import { formatFaPrice } from "@/utils";
import { Box, Divider, Stack, ToggleButton } from "@mui/material";
import NextLink from "@/components/ui/Link/NextLink";

type Timeframe = "monthly" | "quarterly" | "biannual" | "annual";

const timeframeLabels: Record<Timeframe, string> = {
  monthly: "ماهانه",
  quarterly: "سه ماهه",
  biannual: "شش ماهه",
  annual: "سالانه",
};

const chartDataByTimeframe: Record<Timeframe, number[]> = {
  monthly: [12, 18, 15, 22, 28, 24, 32, 38, 34, 42, 45, 40, 36, 44, 48],
  quarterly: [10, 16, 20, 18, 26, 30, 28, 35, 33, 40, 38, 45],
  biannual: [8, 14, 12, 20, 24, 22, 30, 28, 36, 34, 42, 40, 46, 44, 50, 48],
  annual: [6, 12, 10, 18, 16, 24, 22, 30, 28, 36, 34, 42, 40, 46, 44, 50],
};

const products = [
  { id: "rebar-a3-16", title: "میلگرد آجدار A3 سایز ۱۶" },
  { id: "rebar-a3-14", title: "میلگرد آجدار A3 سایز ۱۴" },
  { id: "rebar-a3-12", title: "میلگرد آجدار A3 سایز ۱۲" },
];

const productStats = {
  lastPrice: 28750,
  change24h: "+۱.۸٪",
  lowestPrice: 28300,
  highestPrice: 29400,
};

function ChartStatRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <BulletText sx={{ color: "text.caption", whiteSpace: "nowrap" }}>
        {label}
      </BulletText>
      <DashedLine sx={{ flex: 1, color: "border.secondary" }} />
      <Box sx={{ whiteSpace: "nowrap" }}>{children}</Box>
    </Box>
  );
}

function page() {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const [productId, setProductId] = useState(products[0].id);

  const handleTimeframeChange = (_: unknown, value: Timeframe | null) => {
    if (!value) return;
    setTimeframe(value);
  };

  return (
    <Page>
      <Header>
        <PageHeader
          title="نمودار ها"
          subtitle="تحلیل خلاصه‌ای از وضعیت قیمت محصولات"
        />
      </Header>

      <Main>
        <Section>
          <PanelPaper
            sx={{
              width: "100%",
              p: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              minHeight: "420px",
            }}
          >
            <Box sx={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: { xs: "100%", md: "340px" },
                  flexShrink: 0,
                }}
              >
                <PagePaperTitle sx={{ mb: "20px" }}>
                  {"تحلیل خلاصه‌ای از وضعیت قیمت محصولات"}
                </PagePaperTitle>

                <InputSelect
                  variant="outlined"
                  value={productId}
                  onChange={setProductId}
                  sx={{
                    width: "186px"
                  }}
                >
                  <InputSelectMenu>
                    {products.map((product) => (
                      <InputSelectItem key={product.id} value={product.id}>
                        {product.title}
                      </InputSelectItem>
                    ))}
                  </InputSelectMenu>
                </InputSelect>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ToggleTabGroup
                  size="small"
                  value={timeframe}
                  onChange={handleTimeframeChange}
                >
                  <ToggleButton value="annual">{timeframeLabels.annual}</ToggleButton>
                  <Divider orientation="vertical" flexItem />
                  <ToggleButton value="biannual">
                    {timeframeLabels.biannual}
                  </ToggleButton>
                  <Divider orientation="vertical" flexItem />
                  <ToggleButton value="quarterly">
                    {timeframeLabels.quarterly}
                  </ToggleButton>
                  <Divider orientation="vertical" flexItem />
                  <ToggleButton value="monthly">
                    {timeframeLabels.monthly}
                  </ToggleButton>
                </ToggleTabGroup>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "32px",
                flex: 1,
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "340px" },
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "1px solid",
                  borderColor: "border.dark",
                  pl: "32px",
                }}
              >
                <Stack sx={{ gap: "20px", flex: 1 }}>
                  <ChartStatRow label="آخرین قیمت">
                    <Price sx={{ gap: "6px" }}>
                      <PriceAmount variant="body2" sx={{ color: "text.heading" }}>
                        {formatFaPrice(productStats.lastPrice)}
                      </PriceAmount>
                      <PriceUnit variant="caption2" sx={{ color: "text.caption" }} />
                    </Price>
                  </ChartStatRow>

                  <ChartStatRow label="تغییرات ۲۴ ساعت گذشته">
                    <BulletText sx={{ color: "text.profit" }}>
                      {productStats.change24h}
                    </BulletText>
                  </ChartStatRow>

                  <ChartStatRow label="کمترین قیمت">
                    <Price sx={{ gap: "6px" }}>
                      <PriceAmount variant="body2" sx={{ color: "text.heading" }}>
                        {formatFaPrice(productStats.lowestPrice)}
                      </PriceAmount>
                      <PriceUnit variant="caption2" sx={{ color: "text.caption" }} />
                    </Price>
                  </ChartStatRow>

                  <ChartStatRow label="بیشترین قیمت">
                    <Price sx={{ gap: "6px" }}>
                      <PriceAmount variant="body2" sx={{ color: "text.heading" }}>
                        {formatFaPrice(productStats.highestPrice)}
                      </PriceAmount>
                      <PriceUnit variant="caption2" sx={{ color: "text.caption" }} />
                    </Price>
                  </ChartStatRow>
                </Stack>

                <NextLink href="/panel/trade" sx={{ mt: "32px", width: "100%" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    {"معامله"}
                  </Button>
                </NextLink>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0, minHeight: "320px" }}>
                <AreaLineChart
                  data={chartDataByTimeframe[timeframe]}
                  height={320}
                />
              </Box>
            </Box>
          </PanelPaper>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
