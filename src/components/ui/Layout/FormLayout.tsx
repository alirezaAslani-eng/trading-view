"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import Alert from "@/components/ui/Alert/Alert";
import {
  ButtonProps,
  Stack,
  StackProps,
  styled,
  Typography,
  TypographyProps,
  useFormControl,
} from "@mui/material";
import Button from "../Button/Button";
import { SubmitButton } from "@/v2-architecture/src/shared/ui";
import { PropsWithChildren } from "react";

const formLayoutGap = "24px";

function FormLayoutAsForm(props: StackProps<"form">) {
  return <Stack component={"form"} {...props} />;
}
const FormLayout = styled(FormLayoutAsForm)({
  gap: formLayoutGap,
  width: "100%",
});

// * FormLayout -> Field
const FormLayoutField = styled(Stack)({
  gap: "8px",
  width: "100%",
});

function FormLayoutFieldError(props: { isError: boolean; message?: string }) {
  return (
    <>
      {props.isError && (
        <Typography variant="caption1" sx={{ color: "status.loss", mt: "4px" }}>
          {props.message}
        </Typography>
      )}
    </>
  );
}

// * FormLayout -> GroupField
const FormLayoutFieldGroup = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
});

// * FormLayout -> Lable
function FormLayoutLable(props: TypographyProps<"label">) {
  return (
    <Typography
      component={"label"}
      variant="button2"
      {...props}
      sx={(tm) => ({ color: "text.heading", ...identifySxProp(tm, props?.sx) })}
    />
  );
}

const FormLayoutSubmit = styled(SubmitButton)({
  marginTop: `calc(32px - ${formLayoutGap})`,
});

// * FormLayout -> Alert
const FormLayoutAlert = styled(Alert)({
  marginBottom: `calc(32px - ${formLayoutGap})`,
  marginRight: "auto",
  marginLeft: "auto",
});

// * FormLayout -> Checkbox
const FormLayoutCheckbox = styled(Stack)({
  gap: "14px",
  width: "100%",
});

// * FormLayout -> CheckboxGroup
const FormLayoutCheckboxGroup = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "38px",
  flexWrap: "wrap",
});

export {
  FormLayout,
  FormLayoutField,
  FormLayoutCheckbox,
  FormLayoutSubmit,
  FormLayoutFieldGroup,
  FormLayoutCheckboxGroup,
  FormLayoutAlert,
  FormLayoutLable,
  FormLayoutFieldError,
};
