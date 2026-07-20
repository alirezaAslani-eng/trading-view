import { SvgIcon, SvgIconProps } from "@mui/material";

function ArrowLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.4995 16.6L7.06621 11.1667C6.42454 10.525 6.42454 9.47499 7.06621 8.83333L12.4995 3.39999"
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

export default ArrowLeftIcon;