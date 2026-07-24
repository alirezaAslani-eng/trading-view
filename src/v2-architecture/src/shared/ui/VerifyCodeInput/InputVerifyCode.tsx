"use client";
import { Box, BoxProps } from "@mui/material";
import useMultipleInput from "./useMultipleInput";
import { identifySxProp } from "@/v2-architecture/src/design-system";
import { InputPhoneNumber } from "../Input";

interface InputVerifyCodeProps extends Pick<BoxProps, "sx"> {
  onComplete?: (value: string) => void;
  error?: boolean;
}

function InputVerifyCode({ onComplete, error, sx }: InputVerifyCodeProps) {
  const { getKey, register } = useMultipleInput({
    inputCount: 6,
    onComplete,
  });

  return (
    <Box
      sx={(tm) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        ...identifySxProp(tm, sx),
      })}
    >
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(5)}
        key={getKey(5)}
        autoComplete="off"
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(4)}
        key={getKey(4)}
        autoComplete="off"
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(3)}
        key={getKey(3)}
        autoComplete="off"
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(2)}
        key={getKey(2)}
        autoComplete="off"
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(1)}
        key={getKey(1)}
        autoComplete="off"
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(0)}
        key={getKey(0)}
        autoComplete="off"
      />
    </Box>
  );
}

export default InputVerifyCode;
