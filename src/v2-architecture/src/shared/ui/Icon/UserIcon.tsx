import { SvgIcon, type SvgIconProps } from "@mui/material";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function UserIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.0002 10.0003C12.3013 10.0003 14.1668 8.13485 14.1668 5.83366C14.1668 3.53247 12.3013 1.66699 10.0002 1.66699C7.69898 1.66699 5.8335 3.53247 5.8335 5.83366C5.8335 8.13485 7.69898 10.0003 10.0002 10.0003Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1585 18.3333C17.1585 15.1083 13.9501 12.5 10.0001 12.5C6.05013 12.5 2.8418 15.1083 2.8418 18.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default UserIcon;
