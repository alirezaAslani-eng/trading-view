import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/design-system";
import { ListItemShape } from "@/shared/ui/ListItemShape";

function BulletItemShape(
  props: ReplaceSxWithSxOnlyObject<ComponentProps<typeof ListItemShape>>,
) {
  return <ListItemShape {...props} sx={{ mt: "10px", ...props.sx }} />;
}

export default BulletItemShape;
