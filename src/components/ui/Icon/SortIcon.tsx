import { SvgIcon, type SvgIconProps } from "@mui/material";

const SortIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 28" {...props}>
      <path
        d="M15.5 8.74997C15.5 8.74997 12.9223 5.25001 12 5.25C11.0777 5.24999 8.5 8.75 8.5 8.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M15.5 19.25C15.5 19.25 12.9223 22.75 12 22.75C11.0777 22.75 8.5 19.25 8.5 19.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default SortIcon;
