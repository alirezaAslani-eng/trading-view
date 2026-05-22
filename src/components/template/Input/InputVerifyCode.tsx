"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { InputVerifyCodeProps } from "@/components/ui/types";
import useVerifyCodeInput from "@/hooks/app/useMultipleInput";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box } from "@mui/material";

function InputVerifyCode({ onComplete, error, sx }: InputVerifyCodeProps) {
  const { getKey, register } = useVerifyCodeInput({
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
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(4)}
        key={getKey(4)}
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(3)}
        key={getKey(3)}
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(2)}
        key={getKey(2)}
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(1)}
        key={getKey(1)}
      />
      <InputPhoneNumber
        error={error}
        countryCode={false}
        sx={{ p: 0, textAlign: "center" }}
        {...register(0)}
        key={getKey(0)}
      />
    </Box>
  );
}

export default InputVerifyCode;
