"use client";
import { Box, Button, FormLabel, Stack, Typography } from "@mui/material";
import useRndomID from "@/hooks/app/useRndomID";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";

/**
 * @param {{sx:import("@mui/material").BoxProps}} p1
 */
function SignupForm({ sx }) {
  const phoneLabelID = useRndomID();
  return (
    <Box
      sx={(tm) => ({ mt: "56px", width: "100%", ...identifySxProp(tm, sx) })}
      component={"form"}
    >
      <Stack
        direction={"row"}
        sx={{ gap: "38px", alignSelf: "start", px: "calc(50px - 18px)" }}
      >
        <CheckBox color="primary" label={"حساب حقیقی"} />
        <CheckBox color="primary" label={"حساب حقوقی"} />
      </Stack>

      <Box sx={{ width: "100%", mt: "32px", px: "calc(50px - 18px)" }}>
        <FormLabel htmlFor={phoneLabelID}>
          <Typography variant="button2" sx={{ color: "text.onPrimary" }}>
            {"شماره موبایل"}
          </Typography>
        </FormLabel>
        <Box sx={{ mt: "10px" }}>
          <InputPhoneNumber />
        </Box>
        <Button
          fullWidth
          sx={{ mt: "32px" }}
          size={"large"}
          variant="contained"
          color="primary"
          type="submit"
        >
          {"تایید و دریافت کد"}
        </Button>
      </Box>
    </Box>
  );
}

export default SignupForm;
