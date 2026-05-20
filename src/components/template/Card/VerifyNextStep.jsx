import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import StatusBadge from "@/components/ui/Feedback/StatusBadge";
import BulletList from "@/components/ui/BulletList/BulletList";
import BulletListTitle from "@/components/ui/BulletList/BulletListTitle";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import BulletText from "@/components/ui/BulletItem/BulletText";
import { LockIcon, UnlockIcon } from "@/components/ui/Icon";
import kycFeatures from "@/constant/features/kyc/kycFeatures";
import Button from "@/components/ui/Button/Button";

const icon_sx = { width: "22px", height: "22px" };
const bullet_heading_sx = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

function VerifyNextStep() {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <StatusBadge />
      <Typography
        variant="h5"
        sx={{ color: "text.onPrimary", mt: "28px", textAlign: "center" }}
      >
        {"اطلاعات شما تایید شد"}
      </Typography>

      <Stack spacing={6} sx={{ mt: "32px", width: "100%" }}>
        <BulletList color="disabled" variant="contained" sx={{ p: "18px" }}>
          <Box sx={bullet_heading_sx}>
            <UnlockIcon sx={icon_sx} />
            <BulletListTitle>{"دسترسی فعلی"}</BulletListTitle>
          </Box>
          <Stack sx={{ gap: "10px", mt: "24px" }}>
            {kycFeatures["Level1_Basic"].map(({ feature }) => {
              return (
                <BulletItem key={feature}>
                  <BulletItemShape color="disabled" />
                  <BulletText>{feature}</BulletText>
                </BulletItem>
              );
            })}
          </Stack>
        </BulletList>
        <BulletList color="primary" variant="contained" sx={{ p: "18px" }}>
          <Box sx={bullet_heading_sx}>
            <LockIcon sx={{ ...icon_sx, color: "text.primary2" }} />
            <BulletListTitle>{"دسترسی فعلی"}</BulletListTitle>
          </Box>
          <Stack sx={{ gap: "10px", mt: "24px" }}>
            {kycFeatures["Level2_Advanced"].map(({ feature }) => {
              return (
                <BulletItem key={feature}>
                  <BulletItemShape color="primary" />
                  <BulletText>{feature}</BulletText>
                </BulletItem>
              );
            })}
          </Stack>
        </BulletList>
      </Stack>

      <Stack spacing={3} sx={{ mt: "42px", width: "100%" }}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          {"احراز هویت سطح 2"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          sx={{ color: "text.onPrimary" }}
        >
          {"داشبورد"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default VerifyNextStep;
