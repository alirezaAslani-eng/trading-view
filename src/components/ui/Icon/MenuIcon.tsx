import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

const MenuIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M3 7H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 12H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 17H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};

export default MenuIcon;
