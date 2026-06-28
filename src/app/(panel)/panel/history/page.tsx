import PageHeader from "@/components/common/Appbar/PageHeader";
import { Page, Main, Header, Section } from "@/components/ui/Layout/PageLayout";
import {
  ActivityHistoryProvider,
  ActivityHistory,
} from "@/components/template/history/ActivityHistory";
function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="تاریخچه"
          subtitle="نمایی کامل از تراکنش‌ها، معاملات و گردش حساب"
        />
      </Header>
      <Main>
        <Section>
          <ActivityHistoryProvider>
            <ActivityHistory />
          </ActivityHistoryProvider>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
