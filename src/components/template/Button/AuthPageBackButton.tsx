"use client";
import { KeyLeftIcon } from "@/components/ui/Icon";
import { ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function AuthPageBackButton() {
  const router = useRouter();
  return (
    <ButtonBase onClick={router.back} sx={{ color: "text.onPrimary", gap: 1 }}>
      <Typography variant="button3">{"بازگشت"}</Typography>
      <KeyLeftIcon fontSize="medium" />
    </ButtonBase>
  );
}

export default AuthPageBackButton;
