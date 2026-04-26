"use client";
import React from "react";
import DropdownButton from "@/components/ui/DropdownButton/DropdownButton";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import { usePathname } from "next/navigation";
import FakeIcon from "@/components/ui/Icon/FakeIcon";
/**
 * @param {React.ComponentProps<typeof NextLink> & {text:string , icon:string, hasNestedItems:boolean,children:import("react").ReactNode}} param0
 */
function PanelSidebarDropdown({
  icon,
  text,
  hasNestedItems,
  children,
  ...linkProps
}) {
  const pathname = usePathname();
  const isOpenNestedMenu = pathname === linkProps.href;
  const LiOrUl = hasNestedItems ? "ul" : "li";
  return (
    <LiOrUl>
      <NextLink {...linkProps}>
        <DropdownButton
          active={isOpenNestedMenu}
          size="large"
          color="nuteral"
          sx={{ justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {icon}
              <Typography variant="button3" sx={{ color: "text.heading" }}>
                {text}
              </Typography>
            </Box>

            {/* // * ---------- Arrow Icon ---------- */}
            {hasNestedItems &&
              (!isOpenNestedMenu ? <FakeIcon /> : <FakeIcon />)}
          </Box>
        </DropdownButton>
      </NextLink>

      {/* // * ------ nesetd items ------ */}
      {isOpenNestedMenu && hasNestedItems && (
        <Box component={"ul"} sx={{ pr: "20px", mt: "18px", mb: "8px" }}>
          <Box
            sx={{
              borderRight: "1px solid",
              pr: "10px",
              borderColor: notDefinedColors["#2F3035"],
            }}
          >
            {children}
          </Box>
        </Box>
      )}
    </LiOrUl>
  );
}

/**
 * @param {React.ComponentProps<typeof NextLink>} param0
 */
function PanelSidebarNestedItem({ activeSx, ...props }) {
  return (
    <Box component={"li"}>
      <NextLink
        {...props}
        sx={(tm) => ({
          height: "36px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          px: "10px",
          ...identifySxProp(tm, props.sx),
        })}
        activeSx={(tm) => ({
          backgroundColor: tm.palette.background.sidebarActive,
          ...identifySxProp(tm, activeSx),
        })}
      >
        {props.children}
      </NextLink>
    </Box>
  );
}

export { PanelSidebarDropdown, PanelSidebarNestedItem };

/**
 *
 * @param {React.ComponentProps<typeof NextLink>} props
 */
