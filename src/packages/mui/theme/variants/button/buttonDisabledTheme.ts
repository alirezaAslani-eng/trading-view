import type {
  ButtonDisabledThemeProps,
  ButtonDisabledThemeReturn,
} from "@/packages/mui/theme/variants/types";

function buttonDisabledTheme({
  theme,
  variant,
}: ButtonDisabledThemeProps): ButtonDisabledThemeReturn {
  const { palette } = theme;

  
  const styles = {
    contained: {
      rootTheme: {
        backgroundColor:palette.background.inputModal,
        color:palette.text.linkTertiary,
      },
    } satisfies ButtonDisabledThemeReturn,
  };

  //@ts-ignore
  const disabledTheme: ButtonDisabledThemeReturn = styles?.[variant];

  return disabledTheme || styles.contained;
}

export default buttonDisabledTheme;
