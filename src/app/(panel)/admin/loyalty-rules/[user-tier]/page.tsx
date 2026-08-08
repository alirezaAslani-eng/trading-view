import PageHeader from "@/components/common/Appbar/PageHeader";
import { Header, Main, Page, Section } from "@/components/ui/Layout/PageLayout";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import EditLoyaltyRuleForm from "@/v2-architecture/src/features/loyalty/components/EditLoyaltyRuleForm";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="ویرایش قانون سطح وفاداری"
          subtitle="حداقل حجم معاملات و نرخ کارمزد این سطح را ویرایش کنید"
        />
      </Header>

      <Main>
        <Section>
          <EditLoyaltyRuleForm />
        </Section>
      </Main>
    </Page>
  );
}

export default page;
