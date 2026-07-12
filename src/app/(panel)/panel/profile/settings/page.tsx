import { Divider } from "@mui/material";
import PageHeader from "@/components/common/Appbar/PageHeader";
import { UserIcon } from "@/components/ui/Icon";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import {
  PageSubNavigation,
  PageSubNavigationLink,
} from "@/components/ui/PageSubNavigation/PageSubNavigation";
import { ROUTES } from "@/constant/app/routes";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader
          title="پروفایل من"
          subtitle="مدیریت اطلاعات و تنظیمات حساب"
        />
      </Header>
      <Main>
        <Section>
          <SectionContent sx={{ gap: "32px" }}>
            <PageSubNavigation>
              <PageSubNavigationLink href={ROUTES.PROFILE.ROOT}>
                <UserIcon />
                {"مشخصات کاربری"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href={ROUTES.PROFILE.BANKS}>
                <UserIcon />
                {"اطلاعات بانکی"}
              </PageSubNavigationLink>
            </PageSubNavigation>

            <PagePaper>
              <PagePaperHeading>
                <PagePaperTitle>{"تنظیمات"}</PagePaperTitle>
              </PagePaperHeading>
              <Divider
                sx={{ mt: "12px", mb: "32px", borderColor: "border.dark" }}
              />
            </PagePaper>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
