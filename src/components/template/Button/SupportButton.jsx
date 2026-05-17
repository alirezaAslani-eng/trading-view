"use client";
import Button from "@/components/ui/Button/Button";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { alpha } from "@mui/material";

/**
 *
 * @param {import("@mui/material").ButtonProps} props
 */
const SupportButton = function (props) {
  return (
    <Button
      {...props}
      sx={(tm) => ({
        backgroundColor: alpha(tm.palette.background.primary, 0.2),
        position: "fixed",
        left: "27px",
        bottom: "29px",
        border: "1.4px solid",
        borderColor: "border.primary",
        color: "text.onPrimary",
        gap: "8px",
        ...identifySxProp(tm, props.sx),
      })}
    />
  );
};

export default SupportButton;
