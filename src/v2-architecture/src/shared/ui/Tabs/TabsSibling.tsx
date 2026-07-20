import { ReplaceSxWithSxOnlyObject } from "@/v2-architecture/src/design-system";
import { Box, type BoxProps } from "@mui/material";

function TabsSibling(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "border.default",
        pr: "30px",
        ...props.sx,
      }}
    />
  );
}

export default TabsSibling;
