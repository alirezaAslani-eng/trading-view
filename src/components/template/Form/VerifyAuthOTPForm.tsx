import { Box, Typography } from "@mui/material";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import InputVerifyCode from "@/components/template/Input/InputVerifyCode";
import SendAuthOTP from "@/components/template/Button/SendAuthOTP";
import { RestartRightIcon } from "@/components/ui/Icon";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function VerifyAuthOTPForm() {
  return (
    <>
      <FormLayout sx={{ mt: "56px" }}>
        <FormLayoutField sx={{ px: "14.5px" }}>
          <FormLayoutLable>{"کد تایید"}</FormLayoutLable>
          <InputVerifyCode />
        </FormLayoutField>

        <FormLayoutSubmit>{"تایید و ادامه"}</FormLayoutSubmit>
      </FormLayout>
      <Box
        sx={{
          width: "100%",
          mt: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NextLink href={""}>
          <Typography
            variant="body3"
            sx={{ color: notDefinedColors["#C6C6C6"] }}
          >
            {"اصلاح شماره موبایل"}
          </Typography>
        </NextLink>

        <SendAuthOTP>
          <RestartRightIcon sx={{ color: "inherit" }} />
          {"اصلاح شماره موبایل"}
        </SendAuthOTP>
      </Box>
    </>
  );
}

export default VerifyAuthOTPForm;
