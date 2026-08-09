import PageHeader from "@/components/common/Appbar/PageHeader";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import { MarginTransferForm } from "@/v2-architecture/src/features/portfolio";
import {
  Page,
  Header,
  Main,
  Section,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/Layout/PageLayout";
import CurrentBalanceCard from "@/components/ui/Card/CurrentBalanceCard";

export default function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="اعتبار معاملاتی"
          subtitle="درخواست اعتبار معاملاتی"
        />
      </Header>

      <Main>
        {/* --------- Wallet Info --------- */}
        <Section>
          <CurrentBalanceCard />
        </Section>
        {/* --------- Wallet Info --------- */}

        {/* --------- Margin Transfer Form --------- */}
        <Section>
          <SectionHeading>
            <SectionTitle>درخواست اعتبار معاملاتی</SectionTitle>
          </SectionHeading>

          <PagePaper>
            <MarginTransferForm />
          </PagePaper>
        </Section>
        {/* --------- Margin Transfer Form --------- */}
      </Main>
    </Page>
  );
}
