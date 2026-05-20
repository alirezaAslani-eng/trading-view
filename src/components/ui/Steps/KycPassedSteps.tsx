"use client";
import CircleBox from "@/components/ui/Box/CircleBox";
import { CheckedIcon, DashedLine } from "@/components/ui/Icon";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { PWC } from "@/types/utils";
import { alpha, Box, Typography } from "@mui/material";

// * This component is used only once at the moment, the structure of it might be changed if it would be used (twice)
function StepCheck({ active, children }: PWC<{ active?: boolean }>) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <CircleBox
        sx={({ palette }) => ({
          p: "4px",
          width: "32px",
          backgroundColor: alpha(palette.text.primary2!, active ? 0.12 : 0.06),
        })}
      >
        <CircleBox
          sx={{
            width: "24px",
            backgroundColor: active
              ? "background.primary"
              : alpha(notDefinedColors["#002247"], 0.44),

            outline: "1.5px solid",
            outlineOffset: "-2px",
            outlineColor: active
              ? "text.primary2"
              : notDefinedColors["#004FA3"],
          }}
        >
          <CheckedIcon
            sx={{
              width: "10px",
              height: "10px",
              color: active ? "text.onPrimary" : notDefinedColors["#004FA3"],
            }}
          />
        </CircleBox>
      </CircleBox>
      <Typography
        variant="body2"
        sx={{ color: active ? "text.onPrimary" : "text.linkTertiary" }}
      >
        {children}
      </Typography>
    </Box>
  );
}

function KycPassedSteps() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <StepCheck active>{"سطح پایه"}</StepCheck>
      <DashedLine sx={{ flex: 1, color: "text.primary" }} />
      <StepCheck active>{"سطح یک"}</StepCheck>
      <DashedLine
        sx={{
          flex: 1,
          color: notDefinedColors["#003975"],
        }}
      />
      <StepCheck active={false}>{"سطح دو"}</StepCheck>
    </Box>
  );
}

export default KycPassedSteps;
