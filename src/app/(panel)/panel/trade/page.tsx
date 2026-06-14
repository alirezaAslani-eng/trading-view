import PageHeader from "@/components/common/Appbar/PageHeader";
import OrderBook from "@/components/template/Table/OrderBook";
import PriceOverview from "@/components/template/Trade/PriceOverview";
import TradePanel from "@/components/template/Trade/TradePanel";
import { Box } from "@mui/material";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import tradePageSpacing_sx from "@/packages/mui/theme/shared-style/features/trading/tradePageSpacing_sx";
import TradingViewChart from "@/components/template/Chart/TradingViewChart";
// TODO the spacing style of this page must be a shared `sx`

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
          <PriceOverview />
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
              <TradePanel />
            </Box>
            {/* // * -------- Order Book -------- */}
            <Box sx={{ width: "270px" }}>
              <OrderBook />
            </Box>

            {/* // * ---------- Trading Chart ---------- */}
            <Box sx={{ flex: 1, minWidth: "0px" }}>
              <TradingViewChart />
            </Box>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
