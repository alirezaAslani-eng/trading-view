"use client";
import PageHeader from "@/components/common/Appbar/PageHeader";
import { Header, Main, Page, Section } from "@/components/ui/Layout/PageLayout";
import { LoyaltyRules } from "@/v2-architecture/src/features/loyalty";

export default function LoyaltyTiersPage() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="سطوح وفاداری"
          subtitle="سطوح وفاداری کاربران، حداقل حجم معاملات و نرخ کارمزد هر سطح را مدیریت کنید"
        />
      </Header>

      <Main>
        <Section>
          <LoyaltyRules />
        </Section>
      </Main>
    </Page>
  );
}
