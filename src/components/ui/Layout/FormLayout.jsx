"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Button, FormLabel, Stack, styled, Typography } from "@mui/material";
import React from "react";

const FormLayout = styled(Stack)({
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
function CommonSubiter(props) {
  return <Button variant="contained" color="primary" size="large" {...props} />;
}
const FormLayoutSubmit = styled(CommonSubiter)({
  marginTop: "32px",
});

export {
  FormLayout,
  FormLayoutField,
  FormLayoutSubmit,
  FormLayoutFieldGroup,
  FormLayoutLable,
};
