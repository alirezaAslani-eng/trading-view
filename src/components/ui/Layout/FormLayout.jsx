"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Button, FormLabel, Stack, styled, Typography } from "@mui/material";
import React from "react";

/**
 * @param {import("@mui/material").StackProps<"form">} props
 */
function FormLayoutAsForm(props) {
  return <Stack component={"form"} {...props} />;
}
const FormLayout = styled(FormLayoutAsForm)({
  gap: "24px",
  width: "100%",
});

// * FormLayout -> Field
const FormLayoutField = styled(Stack)({
  gap: "8px",
  width: "100%",
});

// * FormLayout -> GroupField
const FormLayoutFieldGroup = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
});

// * FormLayout -> Lable
/**
 * @param {import("@mui/material").TypographyProps & {htmlFor:string}} param0
 */
function FormLayoutLable({ htmlFor, ...props }) {
  return (
    <Typography
      component={"label"}
      variant="button2"
      {...props}
      sx={(tm) => ({ color: "text.heading", ...identifySxProp(tm, props?.sx) })}
    />
  );
}

// * FormLayout -> Submit
/**
 * @param {import("@mui/material").ButtonProps} props
 */
function SubmitButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      type="submit"
      {...props}
    />
  );
}
const FormLayoutSubmit = styled(SubmitButton)({
  marginTop: "32px",
});

export {
  FormLayout,
  FormLayoutField,
  FormLayoutSubmit,
  FormLayoutFieldGroup,
  FormLayoutLable,
};
