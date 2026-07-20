import { Box } from "@mui/material";
import InputText from "@/components/ui/Input/InputText";
import { legacyColors } from "@/packages/mui/theme/shades";
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
            borderColor: legacyColors["#3A3A3A"],
            backgroundColor: legacyColors["#282828"],
            borderRadius: "16px",
            pl: "62px",
            fontSize: "body2.fontSize",
            fontFamily: "body2.fontFamily",
            textAlign: "left",
            ...sx,
          }}
        />
      }
    </Box>
  );
}

export default InputPhoneNumber;
