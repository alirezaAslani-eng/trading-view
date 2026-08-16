import PageHeader from "@/components/common/Appbar/PageHeader";
import { Header, Main, Page, Section } from "@/components/ui/Layout/PageLayout";
import CreateRobotForm from "@/v2-architecture/src/features/robot/components/CreateRobotForm";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="ساخت ربات معامله‌گر"
          subtitle="تنظیمات ربات، مدیریت ریسک و قوانین معامله را برای ایجاد یک ربات جدید مشخص کنید"
        />
      </Header>

      <Main>
        <Section>
          <CreateRobotForm />
        </Section>
      </Main>
    </Page>
  );
}

export default page;
