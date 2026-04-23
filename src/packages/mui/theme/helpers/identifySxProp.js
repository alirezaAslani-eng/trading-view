import { SxProps, Theme } from "@mui/material";
/**
 *
 * @param {Theme} tm
 * @param {SxProps<Theme>} sx
 * @returns {object}
 */
function identifySxProp(tm, sx) {
  if (sx instanceof Function) return sx(tm);
  else if (sx instanceof Object) return sx;
  return {};
}

export default identifySxProp;
