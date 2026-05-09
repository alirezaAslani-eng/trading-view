import { DownIcon, DownMinimalIcon } from "@/components/ui/Icon";
import { inputDefaultVariants } from "@/packages/mui/theme/variants";
import { SelectDisplayProps } from "@/components/ui/types";
const downMinimal_sx = {
  width: "14px",
  height: "14px",
};

interface InputSelectIconProps extends Pick<
  SelectDisplayProps,
  "focused" | "variant"
> {}
function InputSelectIcon({
  focused,
  variant = inputDefaultVariants.variant,
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
