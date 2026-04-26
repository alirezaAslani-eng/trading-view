import NextLink from "@/components/ui/Link/NextLink";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import NextImage from "@/components/ui/Image/NextImage";
import BrandName from "@/components/ui/Brand/BrandName";
import FakeIcon from "@/components/ui/Icon/FakeIcon";

const footerTypographyProps = {
  variant: "button3",
  sx: { color: notDefinedColors["#CBCBCB"] },
};
const footerDividerProps = {
  orientation: "vertical",
  flexItem: true,
  sx: { mx: "12px", color: notDefinedColors["#676767"] },
};
function LayoutAuthPage({ children }) {
  return (
    <>
      <Stack
        sx={{
          minHeight: "100svh",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "52px",
          position: "relative",
        }}
      >
        <NextImage
          src={"/images/light-mountain.png"}
          alt="hero image"
          fill
          objectFit="cover"
          sizes="100vh"
          priority
          sx={{
            zIndex: -1,
          }}
        />
        <Stack sx={{ alignItems: "center", mt: "52px  " }}>
          <FakeIcon />
          <BrandName sx={{ mt: "8px" }} />
        </Stack>

        {children}
        <Box sx={{ display: "flex", alignItems: "center", mb: "52px" }}>
          <NextLink href={""}>
            <Typography {...footerTypographyProps}>{"راهنما"}</Typography>
          </NextLink>
          <Divider {...footerDividerProps} />
          <NextLink href={""}>
            <Typography {...footerTypographyProps}>
              {"قوانین و مقررات"}
            </Typography>
          </NextLink>
          <Divider {...footerDividerProps} />
          <NextLink href={""}>
            <Typography {...footerTypographyProps}>{"تماس با ما"}</Typography>
          </NextLink>
        </Box>
      </Stack>
    </>
  );
}

export default LayoutAuthPage;
