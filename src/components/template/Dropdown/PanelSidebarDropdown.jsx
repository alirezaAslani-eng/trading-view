"use client";
import React from "react";
import { Box } from "@mui/system";
import { SvgIcon, Typography } from "@mui/material";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import ArrowDownIcon from "@/assets/svg/arrow-down.svg";
import useIsActiveLink from "@/hooks/app/useIsActiveLink";
import { useActiveItemContext } from "@/context/app/ActiveItem";
const svg_sx = { width: "14px", height: "14px", cursor: "pointer" };

function PanelSidebarDropdown({ icon, text, href, children, id, startWith }) {
  const isActiveLink = useIsActiveLink({ href, startWith });
  const { activeId, removeId, setId } = useActiveItemContext();
  const isOpenNestedMenu = activeId === id;
  const LiOrUl = !!children ? "ul" : "li";
  return (
    <LiOrUl>
      <Box
        sx={{
          px: "16px",
          height: "42px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          ...(isActiveLink && {
            backgroundColor: "background.sidebarActive",
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* // * ---------- Link ---------- */}
          <NextLink
            href={href}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {icon}
            <Typography variant="button3" sx={{ color: "text.heading" }}>
              {text}
            </Typography>
          </NextLink>

          {/* // * ---------- Arrow Icon ---------- */}

          {!!children &&
            (!isOpenNestedMenu ? (
              <SvgIcon sx={svg_sx} onClick={() => setId(id)}>
                <ArrowDownIcon />
              </SvgIcon>
            ) : (
              <SvgIcon
                onClick={removeId}
                sx={{ ...svg_sx, transform: "rotate(180deg)" }}
              >
                <ArrowDownIcon />
              </SvgIcon>
            ))}
        </Box>
      </Box>

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
function PanelSidebarNestedItem(props) {
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
          "&.Mui-active": {
            backgroundColor: "background.sidebarActive",
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

/**
 *
 * @param {React.ComponentProps<typeof NextLink>} props
 */
