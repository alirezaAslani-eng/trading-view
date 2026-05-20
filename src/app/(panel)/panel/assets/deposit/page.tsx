import PageHeader from "@/components/common/Appbar/PageHeader";
import WithdrawForm from "@/components/template/Form/WithdrawForm";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import BulletText from "@/components/ui/BulletItem/BulletText";
import BulletList from "@/components/ui/BulletList/BulletList";
import BulletListTitle from "@/components/ui/BulletList/BulletListTitle";
import CurrentBalanceCard from "@/components/ui/Card/CurrentBalanceCard";
import depositWarnings from "@/constant/features/transaction/depositWarnings";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import {
  transactionPageFormSectionSx,
  warningBulletItemsContainerSx,
} from "@/packages/mui/theme/shared-style";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import { Box, Tab } from "@mui/material";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import TabContent from "@/components/ui/Tabs/TabContent";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="واریز" subtitle="افزایش موجودی کیف پول" />
      </Header>

      <Main>
        <Section>
          <SectionContent sx={transactionPageFormSectionSx}>
            <SectionContent sx={{ flexDirection: "column" }}>
              <CurrentBalanceCard />
              <PagePaper
                sx={{ height: "fit-content", pt: "calc(20px - 12px)" }}
              >
                <TabsProvider defaultState={"1"}>
                  <Tabs
                    sx={{ mb: "56px" }}
                    appearance="standard"
                    color="primary"
                  >
                    <Tab label={"کارت به کارت"} value={"1"} />
                  </Tabs>
                  <TabContent value={"1"}>
                    <WithdrawForm />
                  </TabContent>
                </TabsProvider>
              </PagePaper>
            </SectionContent>

            <BulletList
              color="warning"
              variant="standard"
              sx={{ height: "fit-content" }}
            >
              <BulletListTitle>{"دستورالعمل واریز و نکات مهم"}</BulletListTitle>
              <Box sx={warningBulletItemsContainerSx}>
                {depositWarnings.map(({ warning }) => {
                  return (
                    <BulletItem key={warning}>
                      <BulletItemShape color="warning" />
                      <BulletText>{warning}</BulletText>
                    </BulletItem>
                  );
                })}
              </Box>
            </BulletList>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
