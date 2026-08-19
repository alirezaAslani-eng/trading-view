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
function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
      </Header>
      <Main>
        <Section>
          <Box>
            <TotalAssetCard />
          </Box>
          {/* <SectionContent>
            <Box sx={{ width: "34.36%", minHeight: "242px" }}>
              <ExchangeAssetForm />
            </Box>
          </SectionContent> */}
        </Section>

        <Section>
          <SectionHeading>
            <SectionTitle>{"لیست دارایی کالا"}</SectionTitle>
          </SectionHeading>

          <AssetCartTable />
        </Section>

        <Section>
          {/* <SectionHeading>
            <SectionTitle>فعالیت‌های معاملاتی</SectionTitle>
          </SectionHeading> */}

          <PagePaper>
            <PagePaperHeading sx={{ mb: "40px" }}>
              <PagePaperTitle>{"معامله های ۱۰ درصدی"}</PagePaperTitle>
            </PagePaperHeading>

            <TradeContractsTable />
          </PagePaper>
        </Section>

        <Section>
          <SectionHeading>
            <SectionTitle>{"سفارش های باز"}</SectionTitle>
          </SectionHeading>
          <SectionContent>
            <Box sx={{ width: "75.90%", minHeight: "318px" }}>
              <RecentOrdersTable />
            </Box>
            <Box sx={{ width: "21.90%", minHeight: "318px" }}>
              <BuySellQueueCard />
            </Box>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
