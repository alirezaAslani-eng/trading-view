import { styled } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  ButtonBaseProps,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowLeftIcon } from "@/components/ui/Icon";

const StyledAccountSettingCard = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  minHeight: 76,
  padding: theme.spacing(1.5, 2.5),
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.surfaceLevel5,
  color: theme.palette.text.secondary,
  gap: theme.spacing(1.5),
  borderRadius: theme.spacing(2),

  "& .account-setting-item__icon": {
    width: 40,
    height: 40,
    minWidth: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.background.surfaceLevel4,
    color: theme.palette.text.secondary,
  },

  "& .account-setting-item__content": {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25),
    alignItems: "flex-start",
  },

  "& .account-setting-item__title": {
    color: theme.palette.text.heading,
  },

  "& .account-setting-item__description": {
    color: theme.palette.text.secondary,
  },

  "&.Mui-disabled": {
    opacity: 0.5,
  },
}));

interface AccountSettingCardProps extends ButtonBaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AccountSettingCard({
  icon,
  title,
  description,
  ...props
}: AccountSettingCardProps) {
  return (
    <StyledAccountSettingCard {...props}>
      <Box className="account-setting-item__icon">{icon}</Box>

      <Stack className="account-setting-item__content">
        <Typography className="account-setting-item__title" variant="body2">
          {title}
        </Typography>

        <Typography
          className="account-setting-item__description"
          variant="body4"
        >
          {description}
        </Typography>
      </Stack>

      <ArrowLeftIcon className="account-setting-item__arrow" />
    </StyledAccountSettingCard>
  );
}
