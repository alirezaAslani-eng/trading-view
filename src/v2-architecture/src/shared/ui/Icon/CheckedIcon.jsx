import { SvgIcon } from "@mui/material";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function CheckedIcon(props) {
  return (
    <SvgIcon
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 4.05167L4.05167 7.35333L10.6667 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default CheckedIcon;
