"use client";

import PageHeader from "@/components/common/Appbar/PageHeader";
import EaseTradePanel from "@/components/template/Trade/EaseTradePanel";
import { Header, Main, Page, Section } from "@/components/ui/Layout/PageLayout";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="خرید آسان" subtitle="خرید سریع و آسان محصولات" />
      </Header>
      <Main>
        <Section>
          <EaseTradePanel />
        </Section>
      </Main>
    </Page>
  );
}

export default page;
