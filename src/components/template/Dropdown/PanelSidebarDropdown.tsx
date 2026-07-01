"use client";
import React, { type ReactNode } from "react";
import { Box } from "@mui/system";
import { ButtonBase, SvgIcon, Typography } from "@mui/material";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import ArrowDownIcon from "@/assets/svg/arrow-down.svg";
import useIsActiveLink from "@/hooks/app/useIsActiveLink";
import { useActiveItemContext } from "@/context/app/ActiveItem";

const svg_sx = { width: "14px", height: "14px", cursor: "pointer" };

type NextLinkProps = React.ComponentProps<typeof NextLink>;

interface PanelSidebarDropdownProps {
  icon?: ReactNode;
  text: string;
  href: NextLinkProps["href"];
  children?: ReactNode;
  id: string;
  startWith?: string;
  collapsed?: boolean;
}

function PanelSidebarDropdown({
  icon,
  text,
  href,
  children,
  id,
  startWith,
  collapsed = false,
}: PanelSidebarDropdownProps) {
  const isActiveLink = useIsActiveLink({ href, startWith });
  const { activeId, toggleId } = useActiveItemContext()!;

  const isOpenNestedMenu = !collapsed && activeId === id;
  const LiOrUl = !!children && !collapsed ? "ul" : "li";

  return (
    <LiOrUl>
      <Box
        sx={{
          p: collapsed ? "0px" : "0px 16px 0px 0px",
          height: "42px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          overflowX: "hidden",
          ...(isActiveLink && {
            backgroundColor: "background.sidebarActive",
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: collapsed ? "center" : "space-between",
            flex: collapsed ? "initial" : 1,
            width: collapsed ? "100%" : "auto",
            height: "100%",
          }}
        >
          {/* // * ---------- Link ---------- */}
          <NextLink
            href={href}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : "10px",
              width: collapsed ? "100%" : "auto",
            }}
          >
            {icon}
            {!collapsed && (
              <Typography variant="button3" sx={{ color: "text.heading" }}>
                {text}
              </Typography>
            )}
          </NextLink>

          {/* // * ---------- Arrow Icon ---------- */}
          {!collapsed && !!children && (
            <ButtonBase
              onClick={() => toggleId(id)}
              sx={{ px: "15px", color: "text.onPrimary", borderRadius: "16px" }}
            >
              {!isOpenNestedMenu ? (
                <SvgIcon sx={svg_sx}>
                  <ArrowDownIcon />
                </SvgIcon>
              ) : (
                <SvgIcon sx={{ ...svg_sx, transform: "rotate(180deg)" }}>
                  <ArrowDownIcon />
                </SvgIcon>
              )}
            </ButtonBase>
          )}
        </Box>
      </Box>

      {/* // * ------ nested items ------ */}
      {isOpenNestedMenu && !!children && (
        <Box component="ul" sx={{ pr: "20px", mt: "18px", mb: "8px" }}>
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

function PanelSidebarNestedItem(props: NextLinkProps) {
  return (
    <Box component="li">
      <NextLink
        {...props}
        sx={(tm) => ({
          height: "36px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          px: "10px",
          ...identifySxProp(tm, props.sx),
          "&.Mui-active": {
            backgroundColor: "background.sidebarActive",
            //@ts-ignore
            ...identifySxProp(tm, props.sx)?.["&.Mui-active"],
          },
        })}
      >
        {props.children}
      </NextLink>
    </Box>
  );
}

export { PanelSidebarDropdown, PanelSidebarNestedItem };
