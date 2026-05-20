import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";
import { MenueHorizontal } from "../Icon";
function UserProfileCard() {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.default",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pr: "8px",
        pl: "4px",
        height: "52px",
        borderRadius: "12px",
        gap: "30px",
      }}
    >
      {/* // * ---------- Profile ---------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width:"100%"
        }}
      >
        <UserProfile>
          <UserProfileImage src="/images/person.png" alt="My profile" />
          <UserProfileInfo sx={{ width: "100px" }}>
            {/* // * ---------- Name ---------- */}
            <Typography
              variant="body3"
              sx={{ color: "text.heading", ...lineClamp(1) }}
            >
              {"علی زمانی نژاد"}
            </Typography>
            {/* // * ---------- Email ---------- */}
            <Typography
              variant="caption2"
              sx={{ color: "text.disabled", ...lineClamp(1) }}
            >
              {"Alizamani23@gmail.com ."}
            </Typography>
          </UserProfileInfo>
        </UserProfile>
        <MenueHorizontal />
      </Box>
    </Box>
  );
}

export default UserProfileCard;
