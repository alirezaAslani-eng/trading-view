import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

const HomeIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 22 22" {...props}>
      <path
        d="M8.26898 2.60328L3.32815 6.45328C2.50315 7.09495 1.83398 8.46078 1.83398 9.49661V16.2891C1.83398 18.4158 3.56648 20.1574 5.69315 20.1574H16.3082C18.4348 20.1574 20.1673 18.4158 20.1673 16.2983V9.62494C20.1673 8.51578 19.4248 7.09495 18.5173 6.46245L12.8523 2.49328C11.569 1.59495 9.50648 1.64078 8.26898 2.60328Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 16.4908V13.7408"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default HomeIcon;
