import { Divider } from "@mui/material";
import PageHeader from "@/components/common/Appbar/PageHeader";
import ProfileOverviewSection from "@/components/template/Profile/ProfileOverviewSection";
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
import BankInfoOverviewSection from "@/components/template/Profile/BankTableList";

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
                        </PageSubNavigation>

                        <PagePaper>
                            <PagePaperHeading>
                                <PagePaperTitle>{"اطلاعات بانکی"}</PagePaperTitle>
                            </PagePaperHeading>
                            <Divider
                                sx={{ mt: "12px", mb: "32px", borderColor: "border.dark" }}
                            />
                            <BankInfoOverviewSection />
                        </PagePaper>
                    </SectionContent>
                </Section>
            </Main>
        </Page> 
    )
}

export default page;