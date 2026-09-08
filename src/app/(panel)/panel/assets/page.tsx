import PageHeader from "@/components/common/Appbar/PageHeader";
import TotalAssetCard from "@/components/template/Card/TotalAssetCard";
import { Box } from "@mui/material";
import AssetCartTable from "@/components/template/Table/AssetCartTable";
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
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import { TradeContractsTable } from "@/v2-architecture/src/features/trading";
import { AssetsAnalytics } from "@/components/template/Card/AssetsAnalytics";
import { Grid } from "@mui/system";

function page() {
  return (
    <Page>
      {/* Page header */}
      <Header>
        <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
      </Header>

      <Main>
        {/* Total assets */}
        <Section>
          <TotalAssetCard />
        </Section>

        {/* Assets analytics */}
        <Section sx={{ display: { xs: "block", sm: "block" } }}>
          <SectionHeading>
            <SectionTitle>نمایی از دارایی‌ها</SectionTitle>
          </SectionHeading>

          <AssetsAnalytics />
        </Section>

        {/* Asset list */}
        <Section>
          <SectionHeading>
            <SectionTitle>لیست دارایی کالا</SectionTitle>
          </SectionHeading>

          <AssetCartTable />
        </Section>

        {/* 10% trades */}
        <Section>
          <SectionHeading sx={{ display: { xs: "flex", sm: "none" } }}>
            <SectionTitle>{"معامله های ۱۰"}</SectionTitle>
          </SectionHeading>
          <PagePaper>
            <PagePaperHeading sx={{ mb: "40px" }}>
              <PagePaperTitle>معامله‌های ۱۰ درصدی</PagePaperTitle>
            </PagePaperHeading>

            <TradeContractsTable />
          </PagePaper>
        </Section>

        {/* recent orders */}
        <Section>
          <SectionHeading>
            <SectionTitle>سفارش‌های باز</SectionTitle>
          </SectionHeading>

          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <RecentOrdersTable />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ height: "350px" }}>
              <BuySellQueueCard sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
