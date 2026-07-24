import { CSSProperties, Stack, StackProps, Typography } from "@mui/material";
import StatusBadge from "@/components/ui/Feedback/StatusBadge";
import BulletList from "@/components/ui/BulletList/BulletList";
import BulletListTitle from "@/components/ui/BulletList/BulletListTitle";
import BulletItem from "@/components/ui/BulletItem/BulletItem";
import BulletItemShape from "@/components/ui/BulletItem/BulletItemShape";
import BulletText from "@/components/ui/BulletItem/BulletText";
import { LockIcon, UnlockIcon } from "@/components/ui/Icon";
import kycFeatures from "@/constant/features/kyc/kycFeatures";
import BulletHeading from "@/components/ui/BulletList/BulletHeading";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

const bullet_title_icon_sx = {
  width: "22px",
  height: "22px",
} satisfies CSSProperties;

function KycUpgradeStatus(stackProps: ReplaceSxWithSxOnlyObject<StackProps>) {
  return (
    <Stack {...stackProps} sx={{ alignItems: "center", ...stackProps.sx }}>
      {/* // * ---start--- Prompt Message ------ */}
      <StatusBadge />

      <Typography
        variant="h5"
        sx={{ color: "text.onPrimary", mt: "28px", textAlign: "center" }}
      >
        {"اطلاعات شما تایید شد"}
      </Typography>
      {/* // * ---end--- Prompt Message ------ */}

      {/* // * ---start--- Bullet list ------ */}
      <Stack spacing={6} sx={{ mt: "32px", width: "100%" }}>
        <BulletList color="disabled" variant="contained" sx={{ p: "18px" }}>
          <BulletHeading>
            <UnlockIcon sx={{ width: "22px", height: "22px" }} />
            <BulletListTitle>{"دسترسی فعلی"}</BulletListTitle>
          </BulletHeading>
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
          <BulletHeading>
            <LockIcon
              sx={{ width: "18px", height: "22px", color: "text.primary2" }}
            />
            <BulletListTitle>{"دسترسی فعلی"}</BulletListTitle>
          </BulletHeading>
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
      {/* // * ---end--- Bullet list ------ */}

      {/* // * ---start--- Actions ----- */}
      {stackProps.children}
      {/* // * ---end--- Actions ----- */}
    </Stack>
  );
}

function KycUpgradeStatusAction(
  stackProps: ReplaceSxWithSxOnlyObject<StackProps>,
) {
  return (
    <Stack
      {...stackProps}
      sx={{ gap: "10px", mt: "24px", width: "100%", ...stackProps.sx }}
    />
  );
}

export { KycUpgradeStatus, KycUpgradeStatusAction };
