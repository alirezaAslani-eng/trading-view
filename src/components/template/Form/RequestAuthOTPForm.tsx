"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import requestAuthOTPSchema from "@/validations/auth/requestAuthOTPSchema";
import { RequestAuthOTPSchemaType } from "@/validations/types";
import { authContent } from "@/content/auth";
import { useAuthFlow } from "@/context/feature/auth/AuthFlow/AuthFlowContext";
import AuthFormLayout from "../Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "../Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutContainer from "../Layout/AuthFormLayout/AuthFormLayoutContainer";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutCheckboxGroup,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import { Box } from "@mui/material";
import {
  DateCalanderMenu,
  DateCalanderProvider,
  DateCalanderTrigger,
  DateCalendarDropdown,
  DateValueDisplay,
} from "@/components/ui/DateCalendar/DateCalanderDropdown";
import CheckBox from "@/components/ui/Checkbox/CheckBox";

function RequestAuthOTPForm() {
  const authFlow = useAuthFlow()!;

  const form = useForm({
    resolver: zodResolver(requestAuthOTPSchema),
    defaultValues: {
      identifier: authFlow.identifier,
    },
  });

  const onSubmitHandler: SubmitHandler<RequestAuthOTPSchemaType> = async (
    fields,
  ) => {
    authFlow.submitIdentifier(fields.identifier);
  };

  return (
    <AuthFormLayout sx={{ width: "700px" }}>
      <AuthFormLayoutHeading
        title="به آیرونکس خوش آمدید"
        subTitle="جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید"
      />
      <AuthFormLayoutContainer>
        <FormLayout onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormLayoutFieldGroup>
            <FormLayoutField>
              <FormLayoutLable>{"شماره موبایل"}</FormLayoutLable>
              <InputText
                placeholder="شماره موبایل خود را وارد کنید"
                {...form.register("identifier")}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>{"کد ملی"}</FormLayoutLable>
              <InputText placeholder="کد ملی را وارد کنید" />
            </FormLayoutField>
          </FormLayoutFieldGroup>

          <FormLayoutField>
            <FormLayoutLable>{"تاریخ تولد"}</FormLayoutLable>
            <DateCalanderProvider>
              <DateCalanderTrigger variant="contained" size="medium">
                <DateValueDisplay placeholder="از تاریخ" />
              </DateCalanderTrigger>

              <DateCalanderMenu>
                <DateCalendarDropdown />
              </DateCalanderMenu>
            </DateCalanderProvider>
          </FormLayoutField>

          <FormLayoutField>
            <FormLayoutLable>{"رمز عبور"}</FormLayoutLable>
            <InputText placeholder="رمز عبور خود را ایجاد کنید" />
          </FormLayoutField>

          <FormLayoutField>
            {/* <FormLayoutLable></FormLayoutLable> */}
            <InputText placeholder={"تکرار رمز عبور"} />
          </FormLayoutField>
          <FormLayoutCheckboxGroup>
            {/* <FormLayoutLable></FormLayoutLable> */}
            <CheckBox label="حقیقی" checked />
            <CheckBox label="حقوقی" />
          </FormLayoutCheckboxGroup>

          <FormLayoutSubmit disabled={form.formState.isSubmitting}>
            {"ثبت اطلاعات"}
          </FormLayoutSubmit>
        </FormLayout>
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

export default RequestAuthOTPForm;
