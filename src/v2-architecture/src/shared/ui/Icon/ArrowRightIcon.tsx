import { SvgIcon, SvgIconProps } from "@mui/material";

function ArrowRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.4248 16.6L12.8581 11.1667C13.4998 10.525 13.4998 9.47499 12.8581 8.83333L7.4248 3.39999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
}

export default ArrowRightIcon;
