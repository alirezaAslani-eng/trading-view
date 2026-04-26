"use client";
import React from "react";
import { Box } from "@mui/system";
import { SvgIcon, Typography } from "@mui/material";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import { usePathname } from "next/navigation";
import ArrowDownIcon from "@/assets/svg/arrow-down.svg";
const svg_sx = { width: "14px", height: "14px" };
/**
 * @param {React.ComponentProps<typeof NextLink> & {text:string , icon:string,children:import("react").ReactNode}} param0
 */
function PanelSidebarDropdown({ icon, text, children, ...linkProps }) {
  const pathname = usePathname();
  const isOpenNestedMenu = pathname === linkProps.href;
  const LiOrUl = !!children ? "ul" : "li";
  return (
    <LiOrUl>
      <NextLink
        {...linkProps}
        sx={(tm) => ({
          px: "16px",
          height: "42px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          ...identifySxProp(tm, linkProps.sx),
        })}
        activeSx={(tm) => ({
          backgroundColor: "background.sidebarActive",
          ...identifySxProp(tm, linkProps.activeSx),
        })}
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
          {!!children &&
            (!isOpenNestedMenu ? (
              <SvgIcon sx={svg_sx}>
                <ArrowDownIcon />
              </SvgIcon>
            ) : (
              <SvgIcon sx={{ ...svg_sx, transform: "rotate(180deg)" }}>
                <ArrowDownIcon />
              </SvgIcon>
            ))}
        </Box>
      </NextLink>

      {/* // * ------ nesetd items ------ */}
      {isOpenNestedMenu && !!children && (
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
          backgroundColor: "background.sidebarActive",
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
