"use client";

import NextImage from "@/components/ui/Image/NextImage";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { DownMinimalIcon } from "@/components/ui/Icon";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { kycStatusConfig } from "@/packages/react-query";
import isMaximumKycLevel from "@/utils/features/kyc/isMaximumKycLevel";
import { Section } from "@/components/ui/Layout/PageLayout";
import { useDispatch } from "@/packages/redux";
import { upgradeKycLevel } from "@/redux/features/kyc";
import { KycLevel } from "@/types";
import { kycProgressConfig } from "@/v2-architecture/src/features/kyc/react-query";
import { getKycStepStatus } from "@/v2-architecture/src/features/kyc/helpers";
import { getNextKycLevel } from "@/utils";

const GradientDotPanelRoot = styled(Box)({
  position: "relative",
  width: "100%",
  minHeight: "178px",
  borderRadius: "16px",
  flexShrink: 0,
  overflow: "visible",
  backgroundImage: `linear-gradient(
    90deg,
    #5B91DE 0%,
    #8CB9FB 35%,
    #639CF7 60%,
    #3A86F5 80%,
    #3176D9 100%
  )`,
});

const GradientDotPanelBackground = styled(Box)({
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  backgroundImage:
    "linear-gradient(94deg, #65A1F9 2%, #89B6F9 20%, #6DA3F8 45%, #115CAD 100%)",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    backgroundImage:
      "radial-gradient(circle, rgba(255, 255, 255, 0.18) 2px, transparent 2px)",
    backgroundSize: "20px 20px",
    maskImage:
      "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
  },
});

const PromoButton = styled(Button)(({ theme }) => {
  const { palette } = theme;

  return {
    alignSelf: "flex-start",
    backgroundColor: palette.common.white,
    color: palette.text.primary,
    borderRadius: "999px",
    border: "none",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
    px: "20px",
    height: "40px",
    gap: "6px",
  };
});

function GradientDotPanel({ sx, children, ...props }: BoxProps) {
  return (
    <GradientDotPanelRoot sx={(theme) => identifySxProp(theme, sx)} {...props}>
      <GradientDotPanelBackground />
      {children && (
        <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      )}
    </GradientDotPanelRoot>
  );
}

const queryConfig = kycStatusConfig();

const kycBannerContent = {
  None: {
    title: "یک قدم تا شروع معامله!",
    description:
      "برای ادامه فعالیت و انجام معاملات، لطفاً احراز هویت خود را تکمیل کنید.",
    showButton: true,
    buttonText: "شروع احراز هویت",
  },

  Level1_Basic: {
    title: "احراز هویت اولیه انجام شد 👌",
    description:
      "برای افزایش سطح دسترسی و استفاده از تمامی امکانات، احراز هویت خود را ارتقا دهید.",
    showButton: true,
    buttonText: "ارتقای احراز هویت",
  },

  Level2_Advanced: {
    title: "یک قدم تا تکمیل احراز هویت! 🚀",
    description:
      "برای فعال‌سازی حساب تجاری و دسترسی به تمامی امکانات، احراز هویت خود را به سطح تجاری ارتقا دهید.",
    showButton: true,
    buttonText: "ارتقای احراز هویت",
  },

  Level3_Business: {
    title: "حساب تجاری شما فعال است 🏢",
    description: "تمامی امکانات حساب تجاری برای شما فعال شده است.",
    showButton: false,
    buttonText: "",
  },
} satisfies Record<
  KycLevel,
  {
    title: string;
    description: string;
    showButton: boolean;
    buttonText: string;
  }
>;

function KycPromoBanner() {
  const dispatch = useDispatch();

  //#region // * ------------ Data ------------
  const kycProgress = useQuery(kycProgressConfig());
  if (!kycProgress.isSuccess) return null;
  const kycStepStatus = getKycStepStatus(kycProgress.data);
  //#endregion // * ------------ Data ------------

  const bannerContent = kycBannerContent[kycProgress.data.currentLevel];

  const openKycModal = () => {
    dispatch(upgradeKycLevel());
  };

  return (
    <Section>
      <GradientDotPanel sx={{ overflow: "visible" }}>
        <Stack
          sx={{
            position: "relative",
            minHeight: "168px",
            p: "32px 40px",
            overflow: "visible",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "145px",
              bottom: "-20px",
              width: "224.06px",
              height: "229.44px",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <NextImage
              src="/images/banner.png"
              alt=""
              width={224.06}
              height={229.44}
              sx={{
                width: "224.06px",
                height: "229.44px",
                objectFit: "contain",
                objectPosition: "bottom center",
              }}
            />
          </Box>

          {!kycStepStatus.hasPendingStep ? (
            <Stack
              spacing={0}
              sx={{
                position: "absolute",
                right: "40px",
                top: "32px",
                bottom: "32px",
                justifyContent: "center",
                alignItems: "flex-start",
                textAlign: "right",
                maxWidth: "52%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "text.onPrimary",
                  fontFamily: "var(--iranyekan-demibold)",
                }}
              >
                {bannerContent.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.onPrimary",
                  lineHeight: 1.7,
                  opacity: 0.95,
                }}
              >
                {bannerContent.description}
              </Typography>

              {bannerContent.showButton && (
                <PromoButton sx={{ mt: "24px" }} onClick={openKycModal}>
                  {bannerContent.buttonText}
                  <DownMinimalIcon
                    sx={{
                      color: "inherit",
                      transform: "rotate(90deg)",
                    }}
                  />
                </PromoButton>
              )}
            </Stack>
          ) : (
            <Stack spacing={1} sx={{ maxWidth: "600px" }}>
              <Typography variant="h6" sx={{ color: "text.onPrimary" }}>
                {`درخواست احراز هویت سطح ${
                  getNextKycLevel(kycProgress.data.currentLevel)!.order
                } در حال بررسی است ⏳`}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                تا زمان اعلام نتیجه، امکان ثبت درخواست جدید یا ارتقا به سطح بعدی
                وجود ندارد. پس از پایان بررسی، می‌توانید ادامه فرآیند احراز هویت
                را انجام دهید.
              </Typography>
            </Stack>
          )}
        </Stack>
      </GradientDotPanel>
    </Section>
  );
}

export default KycPromoBanner;
