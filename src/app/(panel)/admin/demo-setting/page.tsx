import PageHeader from "@/components/common/Appbar/PageHeader";
import { Header, Main, Page } from "@/components/ui/Layout/PageLayout";
import { DemoSetting } from "@/v2-architecture/src/features/trading";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="تنزیمات دمو"
          subtitle="مرور سریع بازار، قیمت‌ها و معاملات"
        />
      </Header>
      <Main>
        <DemoSetting />
      </Main>
    </Page>
  );
}

export default page;
