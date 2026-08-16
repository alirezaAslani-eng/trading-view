import PageHeader from "@/components/common/Appbar/PageHeader";
import { Header, Main, Page, Section } from "@/components/ui/Layout/PageLayout";
import RobotListTable from "@/v2-architecture/src/features/robot/components/RobotListTable";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="" subtitle="" />
      </Header>
      <Main>
        <Section>
          <RobotListTable />
        </Section>
      </Main>
    </Page>
  );
}

export default page;
