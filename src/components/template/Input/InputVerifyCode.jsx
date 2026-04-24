"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import useVerifyCodeInput from "@/hooks/app/useVerifyCodeInput";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box } from "@mui/material";
import React from "react";

/**
 * @param {{sx:Omit<import("@mui/material").BoxProps["sx"]>,onComplete:(value:string)=>void,error:boolean}} prosp
 */
function InputVerifyCode({ onComplete, error, sx }) {
  const { getKey, register } = useVerifyCodeInput({
    inputCount: 5,
    onComplete,
  });

  return (
    <Box
      sx={(tm) => ({
        display: "flex",
        alignItems: "center",
        gap: "16px",
        ...identifySxProp(tm, sx),
      })}
    >
      <InputPhoneNumber
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(4)}
        key={getKey(4)}
      />
      <InputPhoneNumber
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(3)}
        key={getKey(3)}
      />
      <InputPhoneNumber
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(2)}
        key={getKey(2)}
      />
      <InputPhoneNumber
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(1)}
        key={getKey(1)}
      />
      <InputPhoneNumber
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(0)}
        key={getKey(0)}
      />
    </Box>
  );
}

export default InputVerifyCode;
