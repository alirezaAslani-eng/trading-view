import PageHeader from "@/components/common/Appbar/PageHeader";
import ProductsTable from "@/components/template/Table/ProductsTable";
import KycPromoBanner from "@/components/template/kycbanner/KycPromoBanner";
import ProductTrendChart from "@/components/template/product/ProductTrendChart";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import {
  Page,
  Main,
  Header,
  Section,
  SectionHeading,
  SectionTitle,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="داشبورد"
          subtitle="مرور سریع بازار، قیمت‌ها و معاملات"
        />
      </Header>
      <Main>
        <Section>
          <KycPromoBanner />
        </Section>

        {/* <Section>
          <TotalAssetCard />
        </Section> */}

        <Section>
          <PortfolioSummary />
        </Section>
        <Section>
          <SectionHeading>
            <SectionTitle>{"وضعیت بازار"}</SectionTitle>
          </SectionHeading>
          <SectionContent>
            <ProductTrendChart />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeading>
            <SectionTitle>{"قیمت‌های لحظه‌ای بازار"}</SectionTitle>
          </SectionHeading>
          <SectionContent>
            <ProductsTable />
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
