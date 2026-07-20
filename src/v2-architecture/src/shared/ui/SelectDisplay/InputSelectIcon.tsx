import { SelectDisplayProps } from "./types";
import { inputDefaults } from "@/v2-architecture/src/shared/ui/shared/input";
import {
  DownMinimalIcon,
  DownIcon,
} from "@/v2-architecture/src/shared/ui/Icon";

const downMinimal_sx = {
  width: "14px",
  height: "14px",
};

interface InputSelectIconProps
  extends Pick<SelectDisplayProps, "focused" | "variant"> {}
function InputSelectIcon({
  focused,
  variant = inputDefaults.variant,
}: InputSelectIconProps) {
  return (
    <>
      {variant === "contained" &&
        (focused ? (
          <DownIcon sx={{ transform: "rotate(180deg)" }} />
        ) : (
          <DownIcon />
        ))}
      {variant === "outlined" &&
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
