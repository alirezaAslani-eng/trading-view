import KycPassedSteps from "@/components/template/kyc/KycPassedSteps";
import { Box, Divider, Stack, Typography } from "@mui/material";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import BulletText from "@/components/ui/BulletItem/BulletText";
import kycFeatures from "@/constant/features/kyc/kycFeatures";
import Button from "@/components/ui/Button/Button";
import NextLink from "@/components/ui/Link/NextLink";
import { dashboardInfo } from "@/api";
import isMaximumKycLevel from "@/utils/features/kyc/isMaximumKycLevel";
import { cookies } from "next/headers";
import {
  BirthDayCakeIcon,
  PenOnPaperIcon,
  UserGuardIcon,
} from "@/components/ui/Icon";
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";
import {
  UserProfileItemCard,
  UserProfileItemInfo,
} from "@/components/ui/Card/UserProfileItemCard";

// ! Issiue : Some data dosen't come from server like `nationalId` and `birthdate`
// TODO : There is a button in this server component that needs to diaspatch an action
async function ProfileOverviewSection() {
  const cookieStore = await cookies();
  const dashboard_info = await dashboardInfo({
    headers: { cookie: cookieStore.toString() },
  })!;

  return (
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
            <Typography variant="body1" sx={{ color: "text.onPrimary" }}>
              {dashboard_info.fullName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.tertiary" }}>
              {dashboard_info.kycLevel}
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
            subTitle={dashboard_info.mobile}
          />
        </UserProfileItemCard>

        <UserProfileItemCard sx={{ flex: 1 }}>
          <UserProfileItemInfo
            icon={<BirthDayCakeIcon />}
            title="تاریخ تولد"
            // subTitle={dashboard_info}
          />
        </UserProfileItemCard>

        <UserProfileItemCard sx={{ flex: 1 }}>
          <UserProfileItemInfo
            icon={<UserGuardIcon />}
            title="شماره موبایل"
            subTitle={dashboard_info.mobile}
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
                <BulletItemShape color="disabled" sx={{ mt: "5px" }} />
                <BulletText variant="body3">{feature}</BulletText>
              </BulletItem>
            );
          })}
        </Stack>
        {/* // * ---end--- Current KYC Features ------- */}
      </Box>
      {!isMaximumKycLevel(dashboard_info.kycLevel) && (
        <>
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
        </>
      )}
    </Stack>
  );
}

export default ProfileOverviewSection;
