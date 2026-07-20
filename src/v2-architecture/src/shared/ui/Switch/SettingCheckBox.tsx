import { Box, BoxProps, Typography } from "@mui/material";
import { ReplaceSxWithSxOnlyObject } from "@/v2-architecture/src/design-system";

const SettingSwitch = (props: ReplaceSxWithSxOnlyObject<BoxProps>) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        ...props?.sx,
      }}
    />
  );
};

const SettingSwitchInfo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
        {title}
      </Typography>
      <Typography variant="body3" sx={{ color: "text.tertiary" }}>
        {description}
      </Typography>
    </Box>
  );
};
export { SettingSwitch, SettingSwitchInfo };
