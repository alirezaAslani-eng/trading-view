import PageHeader from "@/components/common/Appbar/PageHeader";
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
import DepositForm from "@/components/template/Form/DepositForm";
import { TabsProvider } from "@/context/app/TabsContext";
import Tabs from "@/components/ui/Tabs/Tabs";
import TabContent from "@/components/ui/Tabs/TabContent";
import { MarginTransferForm } from "@/v2-architecture/src/features/portfolio";

const tabs = [
  {
    value: "deposit",
    label: "واریز به کیف پول",
    content: <DepositForm />,
  },
  {
    value: "credit",
    label: "دریافت اعتبار",
    content: <MarginTransferForm />,
  },
];
const default_label = tabs[0].value;
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
                <TabsProvider defaultState={default_label}>
                  <Tabs>
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    ))}
                  </Tabs>
                  {tabs.map((tab) => (
                    <TabContent key={tab.value} value={tab.value}>
                      {tab.content}
                    </TabContent>
                  ))}
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
