import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps, ButtonBase, Typography } from "@mui/material";

function PercentButtons(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{ display: "flex", alignItems: "center", gap: "12px", ...props.sx }}
    />
  );
}
function Percent(props: { precent?: string; onClick?: () => void }) {
  return (
    <ButtonBase
      onClick={props.onClick}
      sx={{
        borderRadius: "999px",
        width: "100%",
        p: "4px 12px",
        border: "1px solid",
        borderColor: "border.dark",
        backgroundColor: "background.surfaceLevel5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
      }}
    >
      <Typography variant="button5" sx={{ color: "text.secondary" }}>
        {props.precent}
      </Typography>
    </ButtonBase>
  );
}

export { PercentButtons, Percent };
