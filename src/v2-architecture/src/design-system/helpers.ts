import type { SxProps, Theme } from "@mui/material";

export function identifySxProp(
  tm: Theme,
  sx: SxProps<Theme> | undefined
): object {
  if (sx instanceof Function) return sx(tm) as object;
  else if (sx instanceof Object) return sx;
  return {};
}

export function lineClamp(lineCount: number) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lineCount,
    overflow: "hidden",
  };
}
