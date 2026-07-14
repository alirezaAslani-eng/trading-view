"use client";
import { DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import { SelectDisplayProps } from "../types";
import { Menu, MenuProps } from "@mui/material";
import SelectDisplay from "../DropdownButton/SelectDisplay";
import { identifySxProp } from "@/packages/mui/theme";
import DateCalendar from "./DateCalendar";
import { useState } from "react";

function DateCalanderDropdown({
  displayProps,
  menuProps,
  ...props
}: DateCalendarProps & {
  displayProps?: SelectDisplayProps;
  menuProps?: Omit<MenuProps, "open" | "onClose" | "anchorEl">;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const selectedDateDisplay = props.value?.format("YYYY/MM/DD");

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange: DateCalendarProps["onChange"] = (...args) => {
    props?.onChange?.(...args);
    handleClose();
  };

  return (
    <>
      <SelectDisplay
        component={"button"}
        variant="outlined"
        size="medium"
        onClick={handleOpen}
        focused={open}
        isSelected={!!selectedDateDisplay}
        sx={(tm) => ({
          width: "200px",
          textAlign: "unset",
          ...identifySxProp(tm, displayProps),
        })}
      >
        {selectedDateDisplay ?? "از تاریخ"}
      </SelectDisplay>

      <Menu
        {...menuProps}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: { sx: { backgroundColor: "transparent", boxShadow: "none" } },
        }}
      >
        <DateCalendar {...props} onChange={handleChange} />
      </Menu>
    </>
  );
}

export default DateCalanderDropdown;
