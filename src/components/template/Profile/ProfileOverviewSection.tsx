"use client";
import KycPassedSteps from "@/components/template/kyc/KycPassedSteps";
import { Box, Divider, Stack, Typography } from "@mui/material";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import BulletText from "@/components/ui/BulletItem/BulletText";
import kycFeatures from "@/constant/features/kyc/kycFeatures";
import NextLink from "@/components/ui/Link/NextLink";
import isMaximumKycLevel from "@/utils/features/kyc/isMaximumKycLevel";
import {
  BirthDayCakeIcon,
  PhoneCallIcon,
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
import UpgradeKycAction from "@/components/template/Button/UpgradeKycAction";
import { useQuery } from "@tanstack/react-query";
import { dashboardInfoConfig } from "@/packages/react-query";
import { convertToJalali } from "@/packages/dayjs";
import { KycLevel } from "@/types";
import KYC_LEVEL_ORDER from "@/constant/features/kyc/kycLevelOreder";
import { UseQueryResult } from "@tanstack/react-query";
import { getInitials } from "@/utils/features/user/getInitials";
import { JALALI_FORMAT } from "@/constant/app/date";

const kycFallback = "نیاز به احراز حویت";

const queryConfig = dashboardInfoConfig();
function ProfileOverviewSection() {
  const dashboard_info = useQuery(queryConfig);
  const initials = getInitials(dashboard_info.data?.fullName);

  const lastLoginTime = convertToJalali(
    dashboard_info.data?.lastLoginAt ?? "",
  ).format("HH:MM");
  const lastLoginDate = convertToJalali(
    dashboard_info.data?.lastLoginAt ?? "",
  ).format(JALALI_FORMAT);
  return (
    <>
      {dashboard_info.status === "success" && (
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* // * ----start---- User Profile -------- */}
            <UserProfile sx={{ gap: "16px" }}>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  backgroundColor: "background.primary",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
                  {initials}
                </Typography>
              </Box>
              <UserProfileInfo sx={{ gap: "4px" }}>
                <Typography variant="body1" sx={{ color: "text.onPrimary" }}>
                  {dashboard_info.data.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.tertiary" }}>
                  {formatKycLevel(dashboard_info.data.kycLevel)}
                </Typography>
              </UserProfileInfo>
            </UserProfile>
            {/* // * ----end---- User Profile -------- */}

            {/* // * ---start--- Last Login Date ------- */}
            {!!dashboard_info.data?.lastLoginAt && (
              <Typography
                variant="caption1"
                sx={{
                  color: "text.tertiary",
                  mt: "6px",
                  whiteSpace: "pre",
                }}
              >
                {`آخرین ورود   ${lastLoginTime}    ${lastLoginDate}`}
              </Typography>
            )}
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
                subTitle={dashboard_info.data.nationalId ?? kycFallback}
              />
            </UserProfileItemCard>

            <UserProfileItemCard sx={{ flex: 1 }}>
              <UserProfileItemInfo
                icon={<BirthDayCakeIcon />}
                title="تاریخ تولد"
                subTitle={
                  formatBirthdate(dashboard_info.data?.birthDate) ?? kycFallback
                }
              />
            </UserProfileItemCard>

            <UserProfileItemCard sx={{ flex: 1 }}>
              <UserProfileItemInfo
                icon={<PhoneCallIcon />}
                title="شماره موبایل"
                subTitle={dashboard_info.data.mobile}
              />
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
          {!isMaximumKycLevel(dashboard_info.data.kycLevel) && (
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

                <UpgradeKycAction variant="on-surface" size="medium">
                  {"ارتقا سطح کاربری"}
                </UpgradeKycAction>
              </Box>
            </>
          )}
        </Stack>
      )}
    </>
  );
}

export default ProfileOverviewSection;

function formatBirthdate(birthdate: string | null | undefined): string | null {
  const formatedBirthdate = !!birthdate
    ? convertToJalali(birthdate).format("YYYY/MM/DD")
    : null;

  return formatedBirthdate;
}

function formatKycLevel(kycLevel: KycLevel) {
  const kycOrder = KYC_LEVEL_ORDER[kycLevel];
  if (kycOrder === 0) return kycFallback;
  return `سطح ${KYC_LEVEL_ORDER[kycLevel]}`;
}
