"use client";
import { nuteralScrollbar } from "@/packages/mui/theme/shared-style";
import { alpha, styled } from "@mui/material";
import {
  DateCalendarProps,
  DateCalendar as MuiDateCalendar,
} from "@mui/x-date-pickers/DateCalendar";
import CalendarHeader from "./CalenderHeader";

const StyledDateCalendar = styled(MuiDateCalendar)(({ theme }) => {
  const { palette, typography } = theme;
  return {
    backgroundColor: palette.background.inputModal,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    height: "380px",
    maxHeight: "380px",
    padding: 32,
    width: "fit-content",
    border: "1px solid",
    borderColor: palette.border.secondary,
    borderRadius: "24px",
    "& .MuiYearCalendar-root": {
      ...nuteralScrollbar(theme),
      scrollbarGutter: "stable",
    },
    "& .MuiDayCalendar-monthContainer": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    "& .MuiPickersSlideTransition-root": {
      overflow: "hidden",
    },
    "& .MuiDayCalendar-weekContainer": {
      margin: 0,
      gap: "20px",
    },
    "& .MuiDayCalendar-weekDayLabel": {
      margin: 0,
      width: "40px",
      height: "28px",
      color: palette.text.primary2,
    },
    "& .MuiDayCalendar-header": {
      gap: "6.4px",
      margin: "12px 0px",
    },
    "& .MuiPickerDay-root": {
      margin: 0,
      width: "28px",
      height: "28px",
      flexShrink: 0,
      ...typography.button4,
      lineHeight: 1,
      color: palette.text.onPrimary,
    },
    "& .MuiPickerDay-today": {
      outline: "none",
      backgroundColor: alpha(palette.background.primary!, 0.5),
    },
    "& .MuiPickerDay-root.Mui-selected": {
      background: palette.background.primary,
    },
    "& .MuiPickerDay-root:hover": {
      background: alpha(palette.background.primary!, 0.2),
    },
  };
});

function DateCalendar(props: DateCalendarProps) {
  return (
    <StyledDateCalendar
      {...props}
      slots={{
        calendarHeader: CalendarHeader,
        ...props?.slots,
      }}
    />
  );
}

export default DateCalendar;
