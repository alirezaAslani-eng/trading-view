import { NextLink } from "@/v2-architecture/src/shared/ui";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface AuthFormLayoutToggleButoonProps {
  activeButton: "signin" | "signup";
}
const sx = {
  border: "1.4px solid",
  borderColor: "border.default",
  borderRadius: "50px",
  padding: "4px",
  gap: "15px",
};

export default function AuthFormLayoutToggleButoon({
  activeButton,
}: AuthFormLayoutToggleButoonProps) {
  return (
    <ToggleButtonGroup
      value={activeButton}
      size="large"
      color="primary"
      fullWidth
      sx={sx}
    >
      <NextLink href={"/signin"} sx={{ flex: 1 }}>
        <ToggleButton value="signin" fullWidth>
          {"ورود"}
        </ToggleButton>
      </NextLink>
      <NextLink href={"/signup"} sx={{ flex: 1 }}>
        <ToggleButton value="signup" fullWidth>
          {"ثبت نام"}
        </ToggleButton>
      </NextLink>
    </ToggleButtonGroup>
  );
}
