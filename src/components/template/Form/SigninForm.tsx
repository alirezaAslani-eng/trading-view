import { Box, Button, FormLabel, Typography } from "@mui/material";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId } from "react";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function SigninForm() {
  const phoneLabelID = useId();
  return (
    <FormLayout sx={{ mt: "32px" }}>
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

export default SigninForm;
