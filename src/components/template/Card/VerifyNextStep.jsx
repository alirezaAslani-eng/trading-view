import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import StatusBadge from "@/components/ui/Feedback/StatusBadge";
import { LockIcon, UnlockIcon } from "@/components/ui/Icon";
import {
  AuthFeatureList,
  AuthFeatureItems,
  AuthFeatureTitle,
} from "@/components/ui/Card/AuthFeatureList";
import {
  ListItem,
  ListItemStyle,
  ListItemText,
} from "@/components/ui/ListItem/ListItem";
import {
  authLevel1Fetaures,
  authLevel2Fetaures,
} from "@/constant/features/auth/authLevelFetaures";

const icon_sx = { width: "22px", height: "22px" };
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
        <AuthFeatureList color="disabled">
          <AuthFeatureTitle>
            <UnlockIcon sx={icon_sx} />
            {"دسترسی فعلی"}
          </AuthFeatureTitle>
          <AuthFeatureItems>
            {authLevel1Fetaures.map(({ feature, id }) => {
              return (
                <ListItem key={id}>
                  <ListItemStyle color="disabled" />
                  <ListItemText>{feature}</ListItemText>
                </ListItem>
              );
            })}
          </AuthFeatureItems>
        </AuthFeatureList>

        <AuthFeatureList color="primary">
          <AuthFeatureTitle>
            <LockIcon sx={{ ...icon_sx, color: "text.primary2" }} />
            {"دسترسی فعلی"}
          </AuthFeatureTitle>
          <AuthFeatureItems>
            {authLevel2Fetaures.map(({ feature, id }) => {
              return (
                <ListItem key={id}>
                  <ListItemStyle color="primary" />
                  <ListItemText>{feature}</ListItemText>
                </ListItem>
              );
            })}
          </AuthFeatureItems>
        </AuthFeatureList>
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
