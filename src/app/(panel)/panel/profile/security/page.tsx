import { Box, Divider, Stack, ToggleButton } from "@mui/material";
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
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import EditPasswordForm from "@/components/template/Form/EditPasswordForm";

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
              <PageSubNavigationLink href="/panel/profile/my-info">
                <UserIcon />
                {"مشخصات کاربری"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href="/panel/profile/banks">
                <UserIcon />
                {"اطلاعات بانکی"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href="/panel/profile/security">
                <UserIcon />
                {"امنیت"}
              </PageSubNavigationLink>
            </PageSubNavigation>

            <PagePaper>
              <PagePaperHeading>
                <PagePaperTitle>{"امنیت حساب"}</PagePaperTitle>
              </PagePaperHeading>
              <Divider
                sx={{ mt: "12px", mb: "32px", borderColor: "border.dark" }}
              />
              <Stack>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {/* // * ----start---- Tabs -------- */}
                  <ToggleTabGroup value={"1"} size="small">
                    <ToggleButton value={"1"}>
                      {"تایید 2 مرحله ای"}
                    </ToggleButton>
                    <Divider orientation="vertical" flexItem />
                    <ToggleButton value={"2"}>{"تغییر رمز عبور"}</ToggleButton>
                    <Divider orientation="vertical" flexItem />
                    <ToggleButton value={"3"}>{"تاریخچه ورود"}</ToggleButton>
                  </ToggleTabGroup>
                  {/* // * ----end---- Tabs -------- */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    mt: "32px",
                    mx: "70px",
                  }}
                >
                  <EditPasswordForm />
                </Box>
              </Stack>
            </PagePaper>
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;
