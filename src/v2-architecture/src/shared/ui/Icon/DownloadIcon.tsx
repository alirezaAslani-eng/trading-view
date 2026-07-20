import { SvgIcon, SvgIconProps } from "@mui/material";

function DownloadIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.32031 11.6801L11.8803 14.2401L14.4403 11.6801"
        fill="currentColor"
      />
      <path
        d="M9.32031 11.6801L11.8803 14.2401L14.4403 11.6801"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8799 4V14.17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12.1801C20 16.6001 17 20.1801 12 20.1801C7 20.1801 4 16.6001 4 12.1801"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default DownloadIcon;
