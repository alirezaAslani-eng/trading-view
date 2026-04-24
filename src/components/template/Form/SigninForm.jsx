"use client";
import { Box, Button, FormLabel, Typography } from "@mui/material";
import useRndomID from "@/hooks/app/useRndomID";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";

/**
 * @param {{sx:import("@mui/material").BoxProps}} p1
 */
function SigninForm({ sx }) {
  const phoneLabelID = useRndomID();
  return (
    <Box
      sx={(tm) => ({ mt: "32px", width: "100%", ...identifySxProp(tm, sx) })}
      component={"form"}
    >
      <Box sx={{ width: "100%", px: "calc(50px - 18px)" }}>
        <FormLabel htmlFor={phoneLabelID}>
          <Typography variant="button2" sx={{ color: "text.onPrimary" }}>
            {"شماره موبایل"}
          </Typography>
        </FormLabel>
        <Box sx={{ mt: "10px" }}>
          <InputPhoneNumber />
        </Box>
      </Box>

      <Button
        fullWidth
        sx={{ mt: "32px" }}
        variant="contained"
        size={"large"}
        type="submit"
      >
        {"تایید و دریافت کد"}
      </Button>
    </Box>
  );
}

export default SigninForm;
