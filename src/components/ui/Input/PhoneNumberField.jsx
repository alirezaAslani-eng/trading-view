import InputPaper from "@/components/ui/paper/InputPaper";
import BasicTextInput from "@/components/ui/Input/BasicTextInput";
import PhoneCountryCode from "@/components/ui/CountryCode/PhoneCountryCode";
import { identifySxProp } from "@/packages/mui/theme/helpers";
/**
 *
 * @param {import("react").InputHTMLAttributes<HTMLInputElement>} props
 */
function PhoneNumberField(props) {
  return (
    <InputPaper sx={{ px: "15px" }}>
      <BasicTextInput
        type="tel"
        {...props}
        sx={{ pl: "10px", height: "56px" }}
      />
      <PhoneCountryCode />
    </InputPaper>
  );
}

export default PhoneNumberField;
