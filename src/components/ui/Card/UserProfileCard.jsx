import { Box, Stack, Typography } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import ProfileCircle from "@/components/ui/Profile/ProfileCircle";
import FakeIcon from "@/components/ui/Icon/FakeIcon";

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* // * ---------- Profile ---------- */}
        <ProfileCircle src="/images/person.png" />

        {/* // * ---------- Info ---------- */}
        <Stack sx={{ width: "100px", gap: "6px" }}>
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
        </Stack>
      </Box>
      <FakeIcon />
    </Box>
  );
}

export default UserProfileCard;
