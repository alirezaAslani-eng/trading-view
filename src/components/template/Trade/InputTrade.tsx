"use client";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, ButtonBase, ButtonBaseProps, Typography } from "@mui/material";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import { MinusIcon, PluseIcon } from "@/components/ui/Icon";
import { ComponentProps, FocusEventHandler, useState } from "react";
import { OnValueChange } from "react-number-format";

interface InputTradeProps extends Omit<
  ComponentProps<typeof InputNumeric>,
  "onValueChange"
> {
  value?: number | string;
  onValueChange?: (value: string) => void;
  label?: string;
  inputStep?: number;
}

// ! The component is for MVP version, it will be refined

function InputTrade({ label, inputStep = 10, ...props }: InputTradeProps) {
  const [isRisedLabel, setIsRisedLabel] = useState(false);
  const isShowLable = !isNaN(Number(props.value)) || isRisedLabel;

  const forwardOnChange = (v: string) => {
    if (!!!props.onValueChange) return;
    props.onValueChange(v);
  };

  const forwardFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (!!!props.onFocus) return;
    props.onFocus(e);
  };
  const forwardBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (!!!props.onBlur) return;
    props.onBlur(e);
  };

  const onChnageHandler: OnValueChange = ({ value }) => {
    forwardOnChange(value);
  };

  const pluse = () => {
    const value = Number(props.value) || 0;
    forwardOnChange(String(value + inputStep));
  };
  const minus = () => {
    const value = Number(props.value) || 0;
    const minused = String(Math.max(value - inputStep, 0));
    forwardOnChange(minused === "0" ? "" : minused);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsRisedLabel(false);
    forwardBlur(e);
  };
  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsRisedLabel(true);
    forwardFocus(e);
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Typography
          component={"label"}
          variant={"body2"}
          sx={{
            color: "text.linkSecondary",
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            pointerEvents: "none",
            transition: "all ease 200ms",
            transform: `translate(-50%,${isShowLable ? "-25px" : "-50%"}) scale(${isShowLable ? "0.8" : "1"}) `,
          }}
        >
          {label}
        </Typography>
        <ButtonBase
          onClick={pluse}
          sx={{
            borderRadius: "16px",
            height: "100%",
            color: "text.onPrimary",
            position: "absolute",
            px: "14px",
            top: "0px",
            right: "0px",
          }}
        >
          <PluseIcon />
        </ButtonBase>
        <InputNumeric
          thousandSeparator
          variant="contained"
          color="nuteral"
          scale={"large"}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
          sx={{
            height: "60px",
            px: "calc(44px + 14px)",
            textAlign: "center",
            pt: "19px",
          }}
          onValueChange={onChnageHandler}
        />
        <ButtonBase
          onClick={minus}
          sx={{
            borderRadius: "16px",
            height: "100%",
            px: "14px",
            color: "text.onPrimary",
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
        >
          <MinusIcon />
        </ButtonBase>
      </Box>
    </>
  );
}

export { InputTrade };
