"use client";

import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import InputText from "./InputText";
import { EyeIcon, EyeOffIcon } from "../Icon";
import { identifySxProp } from "@/packages/mui/theme";

type InputPasswordProps = Omit<React.ComponentProps<typeof InputText>, "type">;

function InputPassword(props: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <InputText
        {...props}
        type={showPassword ? "text" : "password"}
        sx={(tm) => ({
          ...identifySxProp(tm, props.sx),
          pl: "48px",
        })}
      />

      <IconButton
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </IconButton>
    </Box>
  );
}

export default InputPassword;
