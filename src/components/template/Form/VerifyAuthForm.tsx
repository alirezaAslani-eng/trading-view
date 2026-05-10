"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import {
  Box,
  Button,
  FormLabel,
  Stack,
  StackProps,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
import useRndomID from "@/hooks/app/useRndomID";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import InputVerifyCode from "@/components/template/Input/InputVerifyCode";
import SendAuthOTP from "@/components/template/Button/SendAuthOTP";
import RotateRight from "@/assets/svg/rotate-right.svg";

function VerifyAuthForm({ sx }: Pick<StackProps, "sx">) {
  const verifyInputLabelID = useRndomID();
  return (
    <Stack
      sx={(tm) => ({
        px: "calc(50px - 18px)",
        mt: "56px",
        width: "100%",
        alignItems: "center",
        ...identifySxProp(tm, sx),
      })}
    >
      <Box sx={{ px: "14.5px" }}>
        <FormLabel htmlFor={verifyInputLabelID}>
          <Typography variant="button2" sx={{ color: "text.onPrimary" }}>
            {"کد تایید"}
          </Typography>
        </FormLabel>

        <InputVerifyCode sx={{ mt: "10px" }}  />
      </Box>

      <Button variant="contained" size="large" fullWidth sx={{ mt: "32px" }}>
        {"تایید و ادامه"}
      </Button>

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
          <SvgIcon>
            <RotateRight />
          </SvgIcon>
          {"اصلاح شماره موبایل"}
        </SendAuthOTP>
      </Box>
    </Stack>
  );
}

export default VerifyAuthForm;
