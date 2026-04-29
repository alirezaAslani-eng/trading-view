import { DownIcon, DownMinimalIcon } from "@/components/ui/Icon";
import { inputDefaultVariants } from "@/packages/mui/theme/variants";
import React from "react";
const downMinimal_sx = {
  width: "14px",
  height: "14px",
};
/**
 * @param {{size:string,focused:boolean}} props
 */
function InputSelectIcon({ focused, size = inputDefaultVariants.size }) {
  return (
    <>
      {size === "medium" &&
        (focused ? (
          <DownIcon sx={{ transform: "rotate(180deg)" }} />
        ) : (
          <DownIcon />
        ))}
      {size === "small" &&
        (focused ? (
          <DownMinimalIcon
            sx={{ ...downMinimal_sx, transform: "rotate(180deg)" }}
          />
        ) : (
          <DownMinimalIcon sx={downMinimal_sx} />
        ))}
    </>
  );
}

export default InputSelectIcon;
