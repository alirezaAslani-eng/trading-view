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
      <Stack direction={"row"} sx={{ gap: "38px", alignSelf: "start" }}>
        <CheckBox
          label={<Typography variant="button2">{"حساب حقیقی"}</Typography>}
        />
        <CheckBox
          label={<Typography variant="button2">{"حساب حقوقی"}</Typography>}
        />
      </Stack>

      <Box sx={{ width: "100%", mt: "32px", px: "calc(50px - 18px)" }}>
        <FormLabel htmlFor={phoneLabelID} variant="button2">
          {"شماره موبایل"}
        </FormLabel>
        <Box sx={{ mt: "10px" }}>
          <InputPhoneNumber />
        </Box>
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
  );
}

export default SignupForm;
