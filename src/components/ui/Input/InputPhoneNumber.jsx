import { Box, Typography } from "@mui/material";
import React from "react";
import InputText from "@/components/ui/Input/InputText";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import PhoneCountryCode from "@/components/ui/CountryCode/PhoneCountryCode";
import { identifySxProp } from "@/packages/mui/theme/helpers";
/**
 * @param {React.ComponentProps<typeof InputText>} props
 */
function InputPhoneNumber(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "16px",
        }}
      >
        <PhoneCountryCode />
      </Box>
      <InputText
        type="tel"
        {...props}
        sx={(tm) => ({
          height: "56px",
          border: "1px solid",
          borderColor: notDefinedColors["#3A3A3A"],
          backgroundColor: notDefinedColors["#282828"],
          borderRadius: "16px",
          pl: "62px",
          fontSize: tm.typography.body2.fontSize,
          fontFamily: tm.typography.body2.fontFamily,
          ...identifySxProp(tm, props.sx),
        })}
      />
    </Box>
  );
}

export default InputPhoneNumber;
