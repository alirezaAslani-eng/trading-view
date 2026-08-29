"use client";
import {
  Box,
  ButtonProps,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import Button from "../Button/Button";

const TransactionFormLayout = styled(Stack)({
  alignItems: "center",
  width: "100%",
});
const TransactionFormLayoutFieldContainer = styled(Stack)({
  marginTop: "24px",
  width: "100%",
  gap: "4px",
});

const TransactionFormLayoutFieldAutoFiller = (props: TypographyProps) => (
  <Typography
    variant="body4"
    component={"button"}
    type="button"
    {...props}
    sx={{ color: "text.primary2", alignSelf: "end" }}
  />
);

const TransactionFormLayoutField = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: "8px",
});

const TransactionFormLayoutLabel = styled(Typography)(({ theme }) => {
  const { palette, typography } = theme;
  return {
    minWidth: "90px",
    fontFamily: typography.button2.fontFamily,
    fontSize: typography.button2.fontSize,
    color: palette.text.onPrimary,
    display: "flex",
    justifyContent: "end",
  };
});

const Button_ = (props: ButtonProps) => (
  <Button variant="outlined" color="primary" size="medium" {...props} />
);
const TransactionFormLayoutSubmit = styled(Button_)(({ theme }) => {
  return {
    marginTop: "56px",
    gap: "6px",
  };
});

export {
  TransactionFormLayout,
  TransactionFormLayoutFieldContainer,
  TransactionFormLayoutFieldAutoFiller,
  TransactionFormLayoutField,
  TransactionFormLayoutLabel,
  TransactionFormLayoutSubmit,
};
