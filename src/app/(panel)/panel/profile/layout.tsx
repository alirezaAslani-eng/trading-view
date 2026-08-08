import PageHeader from "@/components/common/Appbar/PageHeader";
import { UserIcon, CardIcon, UserGroupIcon } from "@/components/ui/Icon";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import {
  PageSubNavigation,
  PageSubNavigationLink,
} from "@/components/ui/PageSubNavigation/PageSubNavigation";
import { ROUTES } from "@/constant/app/routes";
import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
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
          <SectionContent sx={{ gap: "32px", alignItems: "start" }}>
            <PageSubNavigation>
              <PageSubNavigationLink href={ROUTES.PROFILE.ROOT}>
                <UserIcon />
                {"مشخصات کاربری"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href={ROUTES.PROFILE.BANKS}>
                <CardIcon />
                {"اطلاعات بانکی"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href={ROUTES.COMPANIES.ROOT} exact={false}>
                <UserGroupIcon />
                {"شرکت ها"}
              </PageSubNavigationLink>
            </PageSubNavigation>

            {children}
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default layout;
