import PageHeader from "@/components/common/Appbar/PageHeader";
import { Header, Main, Page, Section } from "@/components/ui/Layout/PageLayout";
import ConfigRobotForm from "@/v2-architecture/src/features/robot/components/ConfigRobotForm";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="کانفیگ ربات معامله‌گر"
          subtitle="تنظیمات چیدمان صف، مدیریت ریسک و قوانین فشار بازار را ویرایش کنید"
        />
      </Header>

      <Main>
        <Section>
          <ConfigRobotForm />
        </Section>
      </Main>
    </Page>
  );
}

export default page;
