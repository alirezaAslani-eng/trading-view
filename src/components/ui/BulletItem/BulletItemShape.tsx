import { ComponentProps } from "react";
import ListItemShape from "../Decorative/ListItemShape";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

function BulletItemShape(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof ListItemShape>>,
) {
  return <ListItemShape {...props} sx={{ mt: "10px", ...props.sx }} />;
}

export default BulletItemShape;
