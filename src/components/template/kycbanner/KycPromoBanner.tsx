"use client";
import NextImage from "@/components/ui/Image/NextImage";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { DownMinimalIcon } from "@/components/ui/Icon";
import {
  Box,
  BoxProps,
  Button,
  Fade,
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
    <GradientDotPanelRoot sx={(tm) => identifySxProp(tm, sx)} {...props}>
      <GradientDotPanelBackground />
      {children ? (
        <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
      ) : null}
    </GradientDotPanelRoot>
  );
}

const queryConfig = kycStatusConfig();

function KycPromoBanner() {
  const query = useQuery(queryConfig);
  const dispatch = useDispatch();

  if (!query.isSuccess) return null;
  if (isMaximumKycLevel(query.data.kycLevel)) return null;

  const openKycModal = () => {
    dispatch(upgradeKycLevel());
  };
  return (
    <>
      <Section>
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
              <PromoButton sx={{ mt: "24px" }} onClick={openKycModal}>
                {"شروع احراز هویت"}
                <DownMinimalIcon
                  sx={{ color: "inherit", transform: "rotate(90deg)" }}
                />
              </PromoButton>
            </Stack>
          </Box>
        </GradientDotPanel>
      </Section>
    </>
  );
}

export default KycPromoBanner;
