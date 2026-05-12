import { alpha } from "@mui/material";
import {
  ListItemShapeThemeReturn,
  ListItemShapeThemeProps,
} from "@/packages/mui/theme/variants/types";

function listItemShapeTheme({
  color,
  theme,
}: ListItemShapeThemeProps): ListItemShapeThemeReturn {
  const styles = {
    disabled: {
      rootTheme: {
        backgroundColor: theme.palette.text.placeholder,
        outlineColor: alpha(theme.palette.text.placeHolder!, 0.14),
      },
    } satisfies ListItemShapeThemeReturn,
    primary: {
      rootTheme: {
        backgroundColor: theme.palette.text.primary2,
        outlineColor: alpha(theme.palette.text.primary2!, 0.2),
      },
    } satisfies ListItemShapeThemeReturn,
    warning: {
      rootTheme: {
        backgroundColor: theme.palette.status.warning,
        outlineColor: alpha(theme.palette.status.warning!, 0.2),
      },
    } satisfies ListItemShapeThemeReturn,
  };

  return styles?.[color] || styles.primary;
}

export default listItemShapeTheme;
