import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import PageHeader from "@/components/common/Appbar/PageHeader";
import ProductManagementTable from "@/components/template/Table/ProductManagementTable";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="مدیریت محصولات" subtitle="تعریف و ویرایش نمادها" />
      </Header>

      <Main>
        <Section>
          <SectionContent>
            <ProductManagementTable />
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
