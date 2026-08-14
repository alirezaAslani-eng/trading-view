import PageHeader from "@/components/common/Appbar/PageHeader";
import PriceOverview from "@/components/template/Trade/PriceOverview";
import TradePanel from "@/components/template/TradePanel/TradePanel";
import tradePageSpacing_sx from "@/packages/mui/theme/shared-style/features/trading/tradePageSpacing_sx";
import TradeChart from "@/components/template/Trade/TradeChart";
import { Box } from "@mui/material";
import TradingActivity from "@/components/template/Trade/TradingActivity";
import { TradeFormProvider } from "@/components/template/TradePanel/TradeFormContext";
import { OrderBook } from "@/components/template/Table/OrderBook";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import { OrderBookSyncProvider } from "@/context/feature/market/OrderBookSyncProvider";

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
              maxHeight: "617px", // * depends on the height of the largest section
            }}
          >
            {/* // * -------- Trade Panel -------- */}
            <OrderBookSyncProvider />
            <TradeFormProvider>
              <Box sx={{ width: "270px", maxWidth: "270px" }}>
                <TradePanel />
              </Box>
              {/* // * -------- Order Book -------- */}
              <Box sx={{ width: "270px" }}>
                <OrderBook />
              </Box>
            </TradeFormProvider>

            {/* // * ---------- Trading Chart ---------- */}
            <Box sx={{ flex: 1, minWidth: "0px" }}>
              <TradeChart />
            </Box>
          </SectionContent>
        </Section>
        <Section sx={tradePageSpacing_sx.section_sx}>
          <TradingActivity />
        </Section>
      </Main>
    </Page>
  );
}

export default page;
