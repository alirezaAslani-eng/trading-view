"use client";
import PageHeader from "@/components/common/Appbar/PageHeader";
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
      </Main>
    </Page>
  );
}

export default page;

function MarketMovers() {
  return (
    <SectionContent>
      <MarketMoverCardPaper color="profit" sx={{ flex: 1 }}>
        <MarketMoverCardHeader percentage={20} title="بیشترین سود 24H" />
        <MarketMoverCardPrice asset="میلگرد" price={28_700} />
      </MarketMoverCardPaper>

      <MarketMoverCardPaper color="loss" sx={{ flex: 1 }}>
        <MarketMoverCardHeader percentage={20} title="بیشترین سود 24H" />
        <MarketMoverCardPrice asset="میلگرد" price={28_700} />
      </MarketMoverCardPaper>

      <MarketMoverCardPaper color="profit" sx={{ flex: 1 }}>
        <MarketMoverCardHeader percentage={20} title="بیشترین سود 24H" />
        <MarketMoverCardPrice asset="میلگرد" price={28_700} />
      </MarketMoverCardPaper>
    </SectionContent>
  );
}
