import { ReplaceSxWithSxOnlyObject } from "@/design-system";
import { Typography, TypographyProps } from "@mui/material";

function BulletText(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return (
    <Typography
      variant="body2"
      {...props}
      sx={{
        color: "text.secondary",
        ...props.sx,
      }}
    />
  );
}

export default BulletText;
