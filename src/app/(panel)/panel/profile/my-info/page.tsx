import KycPassedSteps from "@/components/ui/Steps/KycPassedSteps";
import { Box, Divider, Stack, Typography } from "@mui/material";
import PageHeader from "@/components/common/Appbar/PageHeader";
import {
  BirthDayCakeIcon,
  PenOnPaperIcon,
  UserGuardIcon,
  UserIcon,
} from "@/components/ui/Icon";
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
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import BulletText from "@/components/ui/BulletItem/BulletText";
import kycFeatures from "@/constant/features/kyc/kycFeatures";
import Button from "@/components/ui/Button/Button";
import {
  UserProfileItemCard,
  UserProfileItemInfo,
} from "@/components/ui/Card/UserProfileItemCard";
import NextLink from "@/components/ui/Link/NextLink";

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
            </PageSubNavigation>

            <PagePaper>
              <PagePaperHeading>
                <PagePaperTitle>{"مشخصات کاربری"}</PagePaperTitle>
              </PagePaperHeading>
              <Divider
                sx={{ mt: "12px", mb: "32px", borderColor: "border.dark" }}
              />
              <Stack>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {/* // * ----start---- User Profile -------- */}
                  <UserProfile sx={{ gap: "16px" }}>
                    <UserProfileImage
                      width={70}
                      height={70}
                      src={"/images/person.png"}
                      alt="my profile"
                    />
                    <UserProfileInfo sx={{ gap: "4px" }}>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.onPrimary" }}
                      >
                        {"علیرضا اصلانی"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.tertiary" }}
                      >
                        {"سطح یک"}
                      </Typography>
                    </UserProfileInfo>
                  </UserProfile>
                  {/* // * ----end---- User Profile -------- */}

                  {/* // * ---start--- Last Login Date ------- */}
                  <Typography
                    variant="caption1"
                    sx={{
                      color: "text.tertiary",
                      mt: "6px",
                      whiteSpace: "pre",
                    }}
                  >
                    {"آخرین ورود   10:35   1405/02/08"}
                  </Typography>
                  {/* // * ---end--- Last Login Date ------- */}
                </Box>

                {/* // * ---start--- User Profile Items -------- */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    mt: "32px",
                  }}
                >
                  <UserProfileItemCard sx={{ flex: 1 }}>
                    <UserProfileItemInfo
                      icon={<UserGuardIcon />}
                      title="کد ملی"
                      subTitle="2940282714"
                    />
                  </UserProfileItemCard>

                  <UserProfileItemCard sx={{ flex: 1 }}>
                    <UserProfileItemInfo
                      icon={<BirthDayCakeIcon />}
                      title="تاریخ تولد"
                      subTitle="1384/08/02"
                    />
                  </UserProfileItemCard>

                  <UserProfileItemCard sx={{ flex: 1 }}>
                    <UserProfileItemInfo
                      icon={<UserGuardIcon />}
                      title="شماره موبایل"
                      subTitle="09339198446"
                    />
                    <NextLink href="">
                      <PenOnPaperIcon />
                    </NextLink>
                  </UserProfileItemCard>
                </Box>
                {/* // * ---end--- User Profile Items -------- */}

                <Box sx={{ px: "18px", mt: "64px" }}>
                  {/* // * ---start--- Passed KYC Steps ------- */}
                  <KycPassedSteps />
                  {/* // * ---end--- Passed KYC Steps ------- */}

                  {/* // * ---start--- Current KYC Features ------- */}
                  <Stack sx={{ mt: "22px", gap: "8px" }}>
                    {kycFeatures["Level2_Advanced"].map(({ feature }) => {
                      return (
                        <BulletItem key={feature}>
                          <BulletItemShape
                            color="disabled"
                            sx={{ mt: "5px" }}
                          />
                          <BulletText variant="body3">{feature}</BulletText>
                        </BulletItem>
                      );
                    })}
                  </Stack>
                  {/* // * ---end--- Current KYC Features ------- */}
                </Box>
                <Divider
                  sx={{ borderColor: "border.dark", mt: "32px", mb: "20px" }}
                />
                <Box
                  sx={{
                    px: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body3" sx={{ color: "text.secondary" }}>
                    {"سقف برداشت و واریز روزانه بیشتری نیاز دارید؟"}
                  </Typography>
                  <Button variant="on-surface">{"ارتقا سطح کاربری"}</Button>
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
