"use client";
import PageHeader from "@/components/common/Appbar/PageHeader";
import { AddIcon } from "@/components/ui/Icon";
import { InputSelect } from "@/components/ui/Input/InputSelect";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import BulletList from "@/components/ui/BulletList/BulletList";
import BulletListTitle from "@/components/ui/BulletList/BulletListTitle";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletText from "@/components/ui/BulletItem/BulletText";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import withdrawWarnings from "@/constant/features/transaction/withdrawWarnings";
import SiklGuides from "@/components/ui/SiklGuides/SiklGuides";
import CurrentBalanceCard from "@/components/ui/Card/CurrentBalanceCard";
import {
  siklGuides,
  siklGuidesForHoliday,
} from "@/constant/features/transaction/siklGuides";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import WithdrawForm from "@/components/template/Form/WithdrawForm";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="برداشت" subtitle="برداشت از کیف پول" />
      </Header>

      <Main>
        <Section>
          <SectionContent
            sx={{ display: "grid", gridTemplateColumns: "1fr 367px" }}
          >
            <SectionContent sx={{ flexDirection: "column" }}>
              {/* // * ----------- Current Balance ----------- */}
              <CurrentBalanceCard />

              {/* // * ----------- Withdraw Form ----------- */}
              <PagePaper sx={{ height: "fit-content" }}>
                <WithdrawForm />
              </PagePaper>
            </SectionContent>

            {/* // * ----------- Warning Box ----------- */}
            <BulletList variant="standard" color="warning">
              <BulletListTitle>
                {"دستورالعمل برداشت و نکات مهم"}
              </BulletListTitle>
              <Stack sx={{ mt: "20px", gap: "20px" }}>
                {withdrawWarnings.map(({ id, warning }) => {
                  return (
                    <BulletItem key={id}>
                      <BulletItemShape color="warning" />
                      <BulletText>{warning}</BulletText>
                    </BulletItem>
                  );
                })}
                <SiklGuides
                  guides={siklGuidesForHoliday}
                  title="سیکل‌های پایا (روزهای تعطیل):"
                />
                <SiklGuides
                  guides={siklGuides}
                  title="سیکل‌های پایا (روزهای غیر تعطیل):"
                />
              </Stack>
            </BulletList>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
