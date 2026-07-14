"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icon";
import { Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";

function CalendarHeader(props: PickersCalendarHeaderProps) {
  const handlePrevMonth = () => {
    return props?.onMonthChange?.(props.currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    props?.onMonthChange?.(props.currentMonth.add(1, "month"));
  };

  const handleViewChange = () => {
    props?.onViewChange?.(props.view === "year" ? "day" : "year");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleNextMonth}>
        <ArrowRightIcon />
      </IconButton>

      <ButtonBase
        sx={{ color: "text.onPrimary", borderRadius: 3, p: 1 }}
        onClick={handleViewChange}
      >
        <Typography variant="button3">
          {props.currentMonth.format("MMMM YYYY")}
        </Typography>
      </ButtonBase>

      <IconButton onClick={handlePrevMonth}>
        <ArrowLeftIcon />
      </IconButton>
    </Box>
  );
}

export default CalendarHeader;
