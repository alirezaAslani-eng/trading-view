"use client";
import InputText from "@/components/ui/Input/InputText";
import { Box, BoxProps, SvgIcon, Typography } from "@mui/material";
import SearchIcon from "@/assets/svg/search-icon.svg";
import NotificationIcon from "@/assets/svg/notification.svg";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import InputMarker from "@/components/ui/Marker/InputMarker";
import LogoutIcon from "@/components/ui/Icon/Logout";

interface PageHeaderProps extends Pick<BoxProps, "sx"> {
  title: string;
  subtitle: string;
}

function PageHeader({ sx, title, subtitle }: PageHeaderProps) {
  return (
    <Box
      component={"header"}
      sx={(tm) => ({
        display: "flex",
        justifyContent: "space-between",
        ...identifySxProp(tm, sx),
      })}
    >
      {/* // * --- Title ----- */}
      <Box component={"aside"}>
        <Typography variant="h2" sx={{ color: "text.heading" }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.heading", mt: "4px" }}>
          {subtitle}
        </Typography>
      </Box>

      {/* // * --- Search Input ----- */}
      <Box
        component={"aside"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          height: "fit-content",
        }}
      >
        <InputMarker
          right={"16.2px"}
          icon={
            <SvgIcon
              sx={{
                colo: "text.secondary",
              }}
            >
              <SearchIcon />
            </SvgIcon>
          }
        >
          <InputText
            placeholder="جستجو.."
            sx={{
              pr: "45px",
              borderRadius: "12px",
              color: "text.heading",
              backgroundColor: "background.surfaceSecondary",
              width: "282px",
              "::placeholder": {
                color: "text.secondary",
              },
            }}
          />
          
        </InputMarker>
        <LogoutIcon/>
        <SvgIcon sx={{ width: "24px", height: "24px" }}>
          <NotificationIcon />
        </SvgIcon>
      </Box>
    </Box>
  );
}

export default PageHeader;
