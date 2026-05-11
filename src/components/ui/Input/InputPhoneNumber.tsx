import { Box } from "@mui/material";
import InputText from "@/components/ui/Input/InputText";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import PhoneCountryCode from "@/components/ui/CountryCode/PhoneCountryCode";
import type { InputPhoneNumberProps } from "@/components/ui/types";

function InputPhoneNumber({
  countryCode = true,
  sx,
  ...props
}: InputPhoneNumberProps) {
  return (
    <Box sx={{ position: "relative" }}>
      {countryCode && (
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
      )}

      {
        <InputText
          type="tel"
          {...props}
          sx={{
            height: "56px",
            border: "1px solid",
            borderColor: notDefinedColors["#3A3A3A"],
            backgroundColor: notDefinedColors["#282828"],
            borderRadius: "16px",
            pl: "62px",
            fontSize: "body2.fontSize",
            fontFamily: "body2.fontFamily",
            ...sx,
          }}
        />
      }
    </Box>
  );
}

export default InputPhoneNumber;
