import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId } from "react";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function RequestAuthOTPForm() {
  const phoneLabelID = useId();
  return (
    <FormLayout>
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

export default RequestAuthOTPForm;
