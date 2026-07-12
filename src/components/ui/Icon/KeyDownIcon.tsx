import { SvgIcon, SvgIconProps } from "@mui/material";

function KeyDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.75 6.75L9 12L14.25 6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default KeyDownIcon;
