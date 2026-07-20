import { SvgIcon, SvgIconProps } from "@mui/material";

function KeyUpIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.75 11.25L9 6L14.25 11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default KeyUpIcon;
