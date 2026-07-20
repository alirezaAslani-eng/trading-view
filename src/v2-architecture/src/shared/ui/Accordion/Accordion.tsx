"use client";
import { Accordion as MuiAccordion, styled, Theme } from "@mui/material";
import { AccordionProps } from "./types";
import { accordionSize, accordionTheme, accordionDefaults } from "./styles";

const Accordion_ = styled(MuiAccordion, {
  shouldForwardProp: (prop) => {
    return !["variant", "color", "size", "border", "accordionBorder"].includes(
      prop as string,
    );
  },
})<AccordionProps>(({
  theme,
  size = accordionDefaults.size,
  color = accordionDefaults.color,
  variant = accordionDefaults.variant,
  accordionBorder,
}: AccordionProps & { theme: Theme }) => {
  const accordion_size = accordionSize({ size, theme });
  const accordion_theme = accordionTheme({
    color,
    variant,
    theme,
  });

  return {
    "& .MuiAccordionSummary-root": {
      ...accordion_theme?.summaryTheme,
      ...accordion_size?.summarySize,
      ...(accordionBorder && { border: "none" }),
    },
    // * ------- Summary Content ---------
    "& .MuiAccordionSummary-content": {
      ...accordion_size?.contentSize,
      ...accordion_theme?.contentTheme,
      margin: "4px 0px",
    },
    // * ------- Summary Icon ---------
    "& .MuiAccordionSummary-content .MuiSvgIcon-root": {
      ...accordion_size?.contentIconSize,
      ...accordion_theme?.contentIconTheme,
    },
    "& .MuiAccordionSummary-content.Mui-expanded .MuiSvgIcon-root": {
      ...accordion_theme?.contentIconExpandedTheme,
    },
    // * ------- Expanding Icon ---------
    "& .MuiAccordionSummary-expandIconWrapper": {
      ...accordion_size?.expandIconSize,
      ...accordion_theme?.expandIconTheme,
    },

    ...(accordionBorder && {
      borderWidth: accordion_size?.summarySize?.borderWidth,
      borderRadius: `${accordion_size?.summarySize?.borderRadius} !important`,
      borderStyle: accordion_theme?.summaryTheme?.borderStyle,
      borderColor: accordion_theme?.summaryTheme?.borderColor,
    }),
  };
});

function Accordion(props: AccordionProps) {
  //@ts-ignore
  return <Accordion_ {...props} />;
}
export default Accordion;
