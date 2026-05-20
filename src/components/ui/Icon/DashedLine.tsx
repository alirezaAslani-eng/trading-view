"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { SvgIcon, SvgIconProps } from "@mui/material";

function DashedLine(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      {...props}
      sx={(tm) => ({
        height: "2px",
        display: "block",
        ...identifySxProp(tm, props.sx),
      })}
    >
      <line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 4"
        vectorEffect="non-scaling-stroke"
      />
    </SvgIcon>
  );
}

export default DashedLine;
