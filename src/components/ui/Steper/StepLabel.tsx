"use client";
import { StepLabel as MuiStepLabel, StepLabelProps } from "@mui/material";
import CircleBox from "../Box/CircleBox";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { CheckedIcon, CircleIcon } from "../Icon";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { alpha, BoxProps } from "@mui/material";
type StepIconStatus = "pending" | "notStarted" | "done";

interface StepIconProps extends ReplaceSxWithSxOnlyObject<BoxProps> {
  status: StepIconStatus;
}
function StepIcon({ status, ...boxProps }: StepIconProps) {
  const isPending = status === "pending";
  const isNotStarted = status === "notStarted";
  const isDone = status === "done";

  const isCircle_Visible: boolean = isPending || isNotStarted;
  const isChecked_Visible: boolean = isDone;
  return (
    <CircleBox
      sx={(tm) => ({
        p: "4px",
        width: "32px",
        backgroundColor: alpha(
          tm.palette.text.primary2!,
          !isNotStarted ? 0.12 : 0.06
        ),
      })}
    >
      <CircleBox
        sx={{
          width: "24px",
          backgroundColor: !isNotStarted
            ? "background.primary"
            : alpha(notDefinedColors["#002247"], 0.44),

          outline: "1.5px solid",
          outlineOffset: "-2px",
          outlineColor: !isNotStarted
            ? "text.primary2"
            : notDefinedColors["#004FA3"],
        }}
      >
        {isChecked_Visible && (
          <CheckedIcon
            sx={{
              width: "10px",
              height: "10px",
              color: !isNotStarted
                ? "text.onPrimary"
                : notDefinedColors["#004FA3"],
            }}
          />
        )}
        {isCircle_Visible && (
          <CircleIcon
            sx={{
              width: "10px",
              color: !isNotStarted
                ? "text.onPrimary"
                : notDefinedColors["#004FA3"],
            }}
          />
        )}
      </CircleBox>
    </CircleBox>
  );
}

export default function StepLabel({
  status,
  ...props
}: StepLabelProps & { status: StepIconStatus }) {
  return (
    <MuiStepLabel
      {...props}
      slots={{
        stepIcon: () => <StepIcon status={status} />,
        ...props?.slots,
      }}
    />
  );
}
