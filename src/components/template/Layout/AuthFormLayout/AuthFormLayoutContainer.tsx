import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps } from "@mui/material";

function AuthFormLayoutContainer(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{ px: { sm: "calc(50px - 18px)" }, width: "100%", ...props.sx }}
    />
  );
}

export default AuthFormLayoutContainer;
