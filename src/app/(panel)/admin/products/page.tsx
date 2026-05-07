import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import PageHeader from "@/components/common/Appbar/PageHeader";
import ProductsTable from "@/components/template/Table/ProductsTable";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="مدیریت محصولات" subtitle="تعریف و ویرایش نمادها" />
      </Header>

      <Main>
        <Section>
          <SectionContent>
            <ProductsTable />
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
