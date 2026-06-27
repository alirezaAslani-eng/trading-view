import React, { PropsWithChildren } from "react";
import { Box, BoxProps, Switch, Typography } from "@mui/material";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";


type SettingSwitchProps = PropsWithChildren<
  ReplaceSxWithSxOnlyObject<BoxProps>
>;

const SettingSwitch = ({
  children,
  sx,
  ...props
}: SettingSwitchProps) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        // justifyContent:"center",
        gap: "12px",
        ...sx,
      }}
    >
    
      {children}
    </Box>
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
        flexDirection:"column",
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
 export{SettingSwitch,SettingSwitchInfo}