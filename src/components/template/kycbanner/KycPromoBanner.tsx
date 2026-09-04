"use client";
import NextImage from "@/components/ui/Image/NextImage";
import { LeftMinimalIcon } from "@/components/ui/Icon";
import { Box, ButtonBase, Stack, styled, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "@/packages/redux";
import { upgradeKycLevel } from "@/redux/features/kyc";
import { kycProgressConfig } from "@/v2-architecture/src/features/kyc/react-query";
import { getKycStepStatus } from "@/v2-architecture/src/features/kyc/helpers";
import { getKycBannerContent } from "./bannerContent";

const BannerPaper = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "14px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundImage: "url('/images/kyc-l1-banner-mobile.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",

  [theme.breakpoints.up("sm")]: {
    minHeight: "178px",
    borderRadius: "16px",
    position: "relative",
    isolation: "isolate",

    backgroundImage: `linear-gradient(
      90deg,
      #5B91DE 0%,
      #8CB9FB 35%,
      #639CF7 60%,
      #3A86F5 80%,
      #3176D9 100%
    )`,

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      borderRadius: "inherit",

      backgroundImage:
        "linear-gradient(94deg, #65A1F9 2%, #89B6F9 20%, #6DA3F8 45%, #115CAD 100%)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      borderRadius: "inherit",

      backgroundImage:
        "radial-gradient(circle, rgba(255, 255, 255, 0.18) 2px, transparent 2px)",

      backgroundSize: "20px 20px",

      maskImage:
        "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",

      WebkitMaskImage:
        "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",

      pointerEvents: "none",
    },
  },
}));

const PromoButton = styled(ButtonBase)(({ theme }) => {
  const { palette, breakpoints, typography } = theme;

  return {
    ...typography.button3,
    padding: "0px 16px",
    display: "none",
    marginTop: "24px",
    alignSelf: "flex-start",
    backgroundColor: palette.common.white,
    color: palette.text.primary,
    borderRadius: "999px",
    border: "none",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
    px: "20px",
    height: "40px",
    gap: "6px",

    [breakpoints.up("sm")]: {
      display: "flex",
    },
  };
});

function KycPromoBanner() {
  const dispatch = useDispatch();

  //#region // * ------------ Data ------------
  const kycProgress = useQuery(kycProgressConfig());
  if (!kycProgress.isSuccess) return null;
  const kycStepStatus = getKycStepStatus(kycProgress.data);
  //#endregion // * ------------ Data ------------

  const { description, title, buttonText } = getKycBannerContent(
    kycProgress.data.currentLevel,
    kycStepStatus.hasPendingStep,
  );

  const openKycModal = () => {
    dispatch(upgradeKycLevel());
  };

  return (
    <BannerPaper>
      <Stack sx={{ p: { xs: "12px", sm: "32px 40px" } }}>
        {/* Content */}
        <Box>
          {/* --start-- Titile & Sub title ----- */}
          <Stack
            spacing={{ xs: 4, sm: 1 }}
            sx={{ maxWidth: { xs: "90%", sm: "52%" } }}
          >
            <Typography
              sx={{
                typography: { xs: "button2", sm: "h5" },
                color: "text.onPrimary",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                color: "text.onPrimary",
                typography: {
                  xs: "button5",
                  "xs-mobile": "button4",
                  sm: "h7",
                },
              }}
            >
              {description}
            </Typography>
          </Stack>
          {/* --end-- Titile & Sub title ----- */}
          {buttonText && (
            <PromoButton onClick={openKycModal}>
              {buttonText}
              <LeftMinimalIcon sx={{ color: "inherit" }} />
            </PromoButton>
          )}
        </Box>
        {/* Content */}

        <NextImage
          src="/images/banner.png"
          alt="icon"
          width={224}
          height={229}
          quality={100}
          sx={{
            position: "absolute",
            left: "145px",
            top: "50%",
            transform: "translateY(-52%)",
            zIndex: 2,
            pointerEvents: "none",
            display: { xs: "none", sm: "block" },
          }}
        />
      </Stack>
    </BannerPaper>
  );
}

export default KycPromoBanner;
