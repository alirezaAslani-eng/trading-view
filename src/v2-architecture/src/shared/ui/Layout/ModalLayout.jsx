"use client";
import { alpha, Box, Stack, styled, Typography } from "@mui/material";
import { CloseIcon } from "@/shared/ui/Icon";
import { identifySxProp } from "@/design-system/helpers";
const backdropFilter = "blur(48px)";

const ModalLayout = styled(Stack)(({ theme }) => {
  const { palette } = theme;
  return {
    backgroundColor: alpha(palette.background.surfaceTertiary, 0.78),
    border: "1px solid",
    borderRadius: "16px",
    borderColor: palette.border.secondary,
    backdropFilter,
    WebkitBackdropFilter: backdropFilter,
    padding: "20px 28px 28px 28px",
  };
});
const ModalLayoutBody = styled(Stack)({
  marginTop: "32px",
});

// * ----------- Heading Section ----------------
const ModalLayoutHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const ModalLayoutCloseIcon = styled(CloseIcon)(({ theme }) => ({
  width: "22px",
  height: "22px",
  cursor: "pointer",
  marginTop: "6px",
  color: theme.palette.text.onPrimary,
}));

/**
 * @param {import("@mui/material").StackProps & {title:string,subtitle:string}} param0
 */
function ModalLayoutTitle({ title, subtitle, ...props }) {
  return (
    <Stack
      {...props}
      sx={(tm) => ({
        gap: "4px",
        ...identifySxProp(tm, props.sx),
      })}
    >
      <Typography variant="h6" sx={{ color: "text.heading" }}>
        {title}
      </Typography>
      <Typography variant="body3" sx={{ color: "text.caption" }}>
        {subtitle}
      </Typography>
    </Stack>
  );
}

export {
  ModalLayout,
  ModalLayoutTitle,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutBody,
};
