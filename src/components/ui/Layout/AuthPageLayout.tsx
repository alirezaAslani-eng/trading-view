import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { BrandIcon, KeyLeftIcon } from "../Icon";
import BrandName from "../Brand/BrandName";
import NextLink from "../Link/NextLink";
import { legacyColors } from "@/packages/mui/theme/shades";
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
  sx: { color: legacyColors["#CBCBCB"] },
};
const footerDividerProps: DividerProps = {
  orientation: "vertical",
  flexItem: true,
  sx: { mx: "12px", borderColor: legacyColors["#676767"] },
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
  props: ReplaceSxWithSxOnlyObject<StackProps>
) {
  return (
    <Stack
      {...props}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100svh",
        gap: "24px",
        py: "52px",
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
