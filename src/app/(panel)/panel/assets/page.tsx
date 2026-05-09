import PageHeader from "@/components/common/Appbar/PageHeader";
import TotalAssetCard from "@/components/template/Card/TotalAssetCard";
import ExchangeAssetForm from "@/components/template/Form/ExchangeAssetForm";
import { Box } from "@mui/material";
import AssetCartTable from "@/components/template/Table/AssetCartTable";
import OpenBuysTable from "@/components/template/Table/OpenBuysTable";
import BuySellQueueCard from "@/components/template/Card/BuySellQueueCard";
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
        <PageHeader title="دارایی‌ها" subtitle="نمای کلی سرمایه و سفارشات" />
      </Header>
      <Main>
        <Section>
          <SectionContent>
            <Box sx={{ width: "63.4%", minHeight: "242px" }}>
              <TotalAssetCard />
            </Box>
            <Box sx={{ width: "34.36%", minHeight: "242px" }}>
              <ExchangeAssetForm />
            </Box>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeading>
            <SectionTitle>{"لیست دارایی کالا"}</SectionTitle>
          </SectionHeading>
          <SectionContent>
            <Box sx={{ minHeight: "332px", flex: 1 }}>
              <AssetCartTable />
            </Box>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeading>
            <SectionTitle>{"سفارش های باز"}</SectionTitle>
          </SectionHeading>
          <SectionContent>
            <Box sx={{ width: "75.90%", minHeight: "318px" }}>
              <OpenBuysTable />
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
