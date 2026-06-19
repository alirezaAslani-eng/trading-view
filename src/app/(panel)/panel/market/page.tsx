"use client";
import PageHeader from "@/components/common/Appbar/PageHeader";
import ProductsTable from "@/components/template/Table/ProductsTable";
import { Box } from "@mui/material";
import {
  MarketMoverCardPaper,
  MarketMoverCardHeader,
  MarketMoverCardPrice,
} from "@/components/ui/Card/MarketMoverCard";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import useMarketMovers from "@/hooks/features/market/useMarketMovers";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="بازار"
          subtitle="نمایی کامل از تراکنش‌ها، معاملات و گردش حساب"
        />
      </Header>
      <Main>
        <Section>
          <MarketMovers />
        </Section>
        <Box component={"section"} sx={{ mt: "24px" }}>
          <ProductsTable />
        </Box>
      </Main>
    </Page>
  );
}

export default page;

function MarketMovers() {
  const { mostProfit, mostLoss, mostTraded } = useMarketMovers();

  return (
    <SectionContent>
      <MarketMoverCardPaper color="profit" sx={{ flex: 1 }}>
        <MarketMoverCardHeader
          percentage={mostProfit?.percentage ?? 0}
          title="بیشترین سود 24H"
        />
        <MarketMoverCardPrice
          asset={mostProfit?.asset ?? "-"}
          price={mostProfit?.price ?? 0}
        />
      </MarketMoverCardPaper>

      <MarketMoverCardPaper color="loss" sx={{ flex: 1 }}>
        <MarketMoverCardHeader
          percentage={mostLoss?.percentage ?? 0}
          title="بیشترین ضرر 24H"
        />
        <MarketMoverCardPrice
          asset={mostLoss?.asset ?? "-"}
          price={mostLoss?.price ?? 0}
        />
      </MarketMoverCardPaper>

      <MarketMoverCardPaper color="profit" sx={{ flex: 1 }}>
        <MarketMoverCardHeader
          percentage={mostTraded?.percentage ?? 0}
          title="بیشترین معامله 24H"
        />
        <MarketMoverCardPrice
          asset={mostTraded?.asset ?? "-"}
          price={mostTraded?.price ?? 0}
        />
      </MarketMoverCardPaper>
    </SectionContent>
  );
}
