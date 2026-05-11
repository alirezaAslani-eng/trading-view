import CheckBox from "@/components/ui/Checkbox/CheckBox";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId } from "react";
import {
  FormLayout,
  FormLayoutCheckboxGroup,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function SignupForm() {
  const phoneLabelID = useId();
  return (
    <FormLayout sx={{ mt: "56px" }}>
      <FormLayoutCheckboxGroup sx={{ mb: "32px" }}>
        <CheckBox color="primary" label={"حساب حقیقی"} />
        <CheckBox color="primary" label={"حساب حقوقی"} />
      </FormLayoutCheckboxGroup>

      <FormLayoutField>
        <FormLayoutLable htmlFor={phoneLabelID}>
          {"شماره موبایل"}
        </FormLayoutLable>
        <InputPhoneNumber id={phoneLabelID} />
      </FormLayoutField>

      <FormLayoutSubmit>{"تایید و دریافت کد"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default SignupForm;
