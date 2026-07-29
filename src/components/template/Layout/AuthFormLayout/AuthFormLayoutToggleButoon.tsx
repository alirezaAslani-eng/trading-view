import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { ToggleButton } from "@mui/material";
import { usePathname } from "next/navigation";

export default function AuthFormLayoutToggleButoon() {
  const pathname = usePathname();
  return (
    <ToggleButtonGroup
      value={pathname}
      size="large"
      color="primary"
      fullWidth
      sx={{
        border: "1.4px solid",
        borderColor: "border.default",
        borderRadius: "50px",
        padding: "4px",
        gap: "15px",
        mb: "54px",
      }}
    >
      <NextLink href={ROUTES.AUTH.SIGNIN} sx={{ flex: 1 }}>
        <ToggleButton value={ROUTES.AUTH.SIGNIN} fullWidth>
          {"ورود"}
        </ToggleButton>
      </NextLink>
      <NextLink href={ROUTES.AUTH.SIGNUP} sx={{ flex: 1 }}>
        <ToggleButton value={ROUTES.AUTH.SIGNUP} fullWidth>
          {"ثبت نام"}
        </ToggleButton>
      </NextLink>
    </ToggleButtonGroup>
  );
}
