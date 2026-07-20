import { InputDisabledProps, InputDisabledReturn } from "./types";

function inputDisabled({
  theme,
  variant,
  color,
}: InputDisabledProps): InputDisabledReturn {
  const { palette } = theme;

  const styles = {
    primary: {
      contained: {
        rootTheme: {
          backgroundColor: palette.background.surfaceSecondary,
          borderColor: "transparent",
          color: palette.text.linkTertiary,
        },
        placeholderTheme: {
          color: palette.text.linkTertiary,
        },
      } satisfies InputDisabledReturn,
    },
  };

  //@ts-ignore
  const style = styles?.[color]?.[variant] as InputDisabledReturn | undefined;

  return style ?? styles.primary.contained;
}

export default inputDisabled;
