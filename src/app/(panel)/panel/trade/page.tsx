import PageHeader from "@/components/common/Appbar/PageHeader";
import OrderBook from "@/components/template/Table/OrderBook";
import PriceOverview from "@/components/template/Trade/PriceOverview";
import TradePanel from "@/components/template/TradePanel/TradePanel";
import tradePageSpacing_sx from "@/packages/mui/theme/shared-style/features/trading/tradePageSpacing_sx";
import TradeChart from "@/components/template/Trade/TradeChart";
import { Box } from "@mui/material";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import { Suspense } from "react";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="معامله"
          subtitle="نمایی کامل از تراکنش‌ها، معاملات و گردش حساب"
        />
      </Header>
      <Main>
        <Section>
          <Suspense>
            <PriceOverview />
          </Suspense>
        </Section>
        <Section sx={tradePageSpacing_sx.section_sx}>
          <SectionContent
            sx={{
              ...tradePageSpacing_sx.sectionContent_sx,
              alignItems: "stretch",
            }}
          >
            {/* // * -------- Trade Panel -------- */}
            <Box sx={{ width: "270px" }}>
              <Suspense>
                <TradePanel />
              </Suspense>
            </Box>
            {/* // * -------- Order Book -------- */}
            <Box sx={{ width: "270px" }}>
              <Suspense>
                <OrderBook />
              </Suspense>
            </Box>

            {/* // * ---------- Trading Chart ---------- */}
            <Box sx={{ flex: 1, minWidth: "0px" }}>
              <Suspense>
                <TradeChart />
              </Suspense>
            </Box>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
