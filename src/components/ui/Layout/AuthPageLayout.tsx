import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { BrandIcon, KeyLeftIcon } from "../Icon";
import BrandName from "../Brand/BrandName";
import NextLink from "../Link/NextLink";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import {
  Box,
  Divider,
  DividerProps,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import AuthPageBackButton from "@/components/template/Button/AuthPageBackButton";

const footerTypographyProps: TypographyProps = {
  variant: "button3",
  sx: { color: notDefinedColors["#CBCBCB"] },
};
const footerDividerProps: DividerProps = {
  orientation: "vertical",
  flexItem: true,
  sx: { mx: "12px", borderColor: notDefinedColors["#676767"] },
};

function AuthPageLayout(props: ReplaceSxWithSxOnlyObject<StackProps>) {
  return (
    <>
      <Stack
        {...props}
        sx={{
          alignItems: "center",
          justifyContent: { xs: "space-between", sm: "center" },
          minHeight: "calc(100svh - 40px)",
          py: "52px",
          ...props.sx,
        }}
      />
    </>
  );
}

function AuthPageLayoutFormContainer(
  props: ReplaceSxWithSxOnlyObject<StackProps>,
) {
  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        gap: "24px",
        ...props.sx,
      }}
    />
  );
}

function AuthPageLayoutBrand() {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <BrandIcon sx={{ height: "70px", width: { xs: "65px", sm: "108px" } }} />
      <BrandName sx={{ mt: "8px" }} />
    </Stack>
  );
}

function AuthPageLayoutHelperLinks() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <NextLink href={""}>
        <Typography {...footerTypographyProps}>{"راهنما"}</Typography>
      </NextLink>
      <Divider {...footerDividerProps} />
      <NextLink href={""}>
        <Typography {...footerTypographyProps}>{"قوانین و مقررات"}</Typography>
      </NextLink>
      <Divider {...footerDividerProps} />
      <NextLink href={""}>
        <Typography {...footerTypographyProps}>{"تماس با ما"}</Typography>
      </NextLink>
    </Box>
  );
}

export {
  AuthPageLayout,
  AuthPageLayoutFormContainer,
  AuthPageLayoutBrand,
  AuthPageLayoutHelperLinks,
};
