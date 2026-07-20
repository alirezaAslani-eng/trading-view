import { SvgIcon, SvgIconProps } from "@mui/material";

function CircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </SvgIcon>
  );
}

export default CircleIcon;
