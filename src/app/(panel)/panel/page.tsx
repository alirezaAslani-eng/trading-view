import PageHeader from "@/components/common/Appbar/PageHeader";
import TotalAssetCard from "@/components/template/Card/TotalAssetCard";
import ExchangeAssetForm from "@/components/template/Form/ExchangeAssetForm";
import { Box } from "@mui/material";
import BuySellQueueCard from "@/components/template/Card/BuySellQueueCard";
import RecentOrdersTable from "@/components/template/Table/RecentOrdersTable";
import {
  Page,
  Main,
  Header,
  Section,
  SectionHeading,
  SectionTitle,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import ProductsTable from "@/components/template/Table/ProductsTable";
import KycPromoBanner from "@/components/template/kycbanner/KycPromoBanner";
import ProductTrendChart from "@/components/template/product/ProductTrendChart";
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
        <KycPromoBanner />
        <Section>
          <SectionContent>
            <TotalAssetCard />
            {/* <Box sx={{ width: "34.36%", minHeight: "242px" }}>
              <ExchangeAssetForm />
            </Box> */}
          </SectionContent>
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
