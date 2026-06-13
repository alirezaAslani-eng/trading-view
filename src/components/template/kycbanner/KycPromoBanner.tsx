"use client";
import NextImage from "@/components/ui/Image/NextImage";
import UpgradeKycAction from "@/components/template/Button/UpgradeKycAction";
import ArrowDownIcon from "@/assets/svg/arrow-down.svg";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box, BoxProps, Stack, styled, SvgIcon, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { kycStatusConfig } from "@/packages/react-query";
import isMaximumKycLevel from "@/utils/features/kyc/isMaximumKycLevel";

const queryConfig = kycStatusConfig();

const GradientDotPanelRoot = styled(Box)({
  position: "relative",
  width: "100%",
  minHeight: "178px",
  borderRadius: "16px",
  flexShrink: 0,
  overflow: "visible",
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
      "radial-gradient(circle, rgba(255, 255, 255, 0.22) 1px, transparent 1px)",
    backgroundSize: "12px 12px",
    maskImage:
      "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
  },
});

function GradientDotPanel({ sx, children, ...props }: BoxProps) {
  return (
    <GradientDotPanelRoot sx={(tm) => identifySxProp(tm, sx)} {...props}>
      <GradientDotPanelBackground />
      {children ? (
        <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      ) : null}
    </GradientDotPanelRoot>
  );
}

function KycPromoBanner() {
  const kycStatus = useQuery(queryConfig);

  const isKycComplete =
    kycStatus.status === "success" &&
    isMaximumKycLevel(kycStatus.data.kycLevel);

  if (isKycComplete) {
    return null;
  }

  return (
    <Box sx={{ mt: "24px", pt: "4px", pb: "8px" }}>
      <GradientDotPanel sx={{ mt: "-4px", overflow: "visible" }}>
        <Box
          sx={{
            position: "relative",
            minHeight: "168px",
            px: "40px",
            pb: "32px",
            pt: "32px",
            overflow: "visible",
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

          <Stack
            spacing={0}
            sx={{
              position: "absolute",
              right: "40px",
              top: "32px",
              bottom: "32px",
              justifyContent: "center",
              maxWidth: "52%",
              alignItems: "flex-start",
              textAlign: "right",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#FFFFFF",
                fontFamily: "var(--iranyekan-demibold)",
                mb: 0,
              }}
            >
              {"یک قدم تا شروع معامله!"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#FFFFFF",
                lineHeight: 1.7,
                opacity: 0.95,
                mt: 0,
              }}
            >
              {
                "برای ادامه فعالیت و انجام معاملات، لطفاً احراز هویت خود را تکمیل کنید"
              }
            </Typography>
            <Box sx={{ mt: "24px" }}>
              <UpgradeKycAction
                size="medium"
                endIcon={
                  <SvgIcon sx={{ fontSize: "18px", color: "#307CF2" }}>
                    <ArrowDownIcon />
                  </SvgIcon>
                }
                sx={{
                  alignSelf: "flex-start",
                  backgroundColor: "#FFFFFF",
                  color: "#307CF2",
                  borderRadius: "999px",
                  border: "none",
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
                  px: "20px",
                  height: "44px",
                  "& .MuiButton-endIcon": {
                    marginInlineStart: "8px",
                    marginInlineEnd: "-4px",
                    transform: "rotate(90deg)",
                  },
                  "&:hover": {
                    backgroundColor: "#F0F4FF",
                  },
                }}
              >
                {"شروع احراز هویت"}
              </UpgradeKycAction>
            </Box>
          </Stack>
        </Box>
      </GradientDotPanel>
    </Box>
  );
}

export default KycPromoBanner;
