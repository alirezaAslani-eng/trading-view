"use client";
import { SelectDisplayProps } from "../types";
import { Box, IconButton, Menu, MenuProps } from "@mui/material";
import SelectDisplay from "../DropdownButton/SelectDisplay";
import { identifySxProp } from "@/packages/mui/theme";
import { JALALI_FORMAT } from "@/constant/app/date";
import { createContext, useContext } from "react";
import { Dayjs } from "dayjs";
import useMuiMenuState from "@/hooks/app/useMuiMenuState";
import { CloseIcon } from "../Icon";
import {  DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import DateCalendar from "./DateCalendar";

//#region // * ------------ DateCalanderProvider ------------
type DateCalendarDropdownContextValue = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  open: (event: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
};

export const DateCalendarDropdownContext =
  createContext<DateCalendarDropdownContextValue | null>(null);

export function useDateCalendarDropdownContext() {
  const ctx = useContext(DateCalendarDropdownContext);
  return ctx;
}
function DateCalanderProvider({ children }: { children: React.ReactNode }) {
  const { anchoreEl, closeMenu, openMenu, isOpenMenu } = useMuiMenuState();
  return (
    <DateCalendarDropdownContext
      value={{
        anchorEl: anchoreEl,
        isOpen: isOpenMenu,
        open: openMenu,
        close: closeMenu,
      }}
    >
      {children}
    </DateCalendarDropdownContext>
  );
}

//#endregion // * ------------ Context ------------

//#region // * ------------ DateValueDisplay ------------
type DateValueDisplayProps = {
  value: Dayjs | null | undefined;
  placeholder?: string;
  onClear?: () => void;
};

function DateValueDisplay({
  value,
  placeholder,
  onClear,
}: DateValueDisplayProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: " 2px" }}>
      {!!value && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      {value ? value.format(JALALI_FORMAT) : (placeholder ?? "")}
    </Box>
  );
}
//#endregion // * ------------ DateDsplayValue ------------

//#region // * ------------ DateCalanderTrigger ------------
interface DateCalanderTriggerProps extends Omit<
  SelectDisplayProps,
  "onClick" | "focused" | "isSelected"
> {
  value: Dayjs | null | undefined;
  onClear?: () => void;
}

function DateCalanderTrigger({
  value,
  onClear,
  ...props
}: DateCalanderTriggerProps) {
  const { isOpen, open } = useDateCalendarDropdownContext()!;

  return (
    <SelectDisplay
      component={"button"}
      variant="outlined"
      size="small"
      {...props}
      //#region // * ---- not overrideable ----
      onClick={!props.disabled ? open : undefined}
      focused={isOpen}
      isSelected={!!value}
      //#endregion // * ---- not overrideable ----
      sx={(tm) => ({
        width: "100%",
        textAlign: "unset",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        ...identifySxProp(tm, props.sx),
      })}
    />
  );
}
//#endregion // * ------------ Trigger Component ------------

//#region // * ------------ DateCalanderMenu ------------
type DateCalanderMenuProps = Omit<
  MenuProps,
  "open" | "onClose" | "anchorEl"
> & {};

function DateCalanderMenu(props: DateCalanderMenuProps) {
  const { anchorEl, isOpen, close } = useDateCalendarDropdownContext()!;

  return (
    <Menu
      sx={(tm) => ({ mt: "18px", ...identifySxProp(tm, props.sx) })}
      {...props}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={close}
      slotProps={{
        paper: { sx: { backgroundColor: "transparent", boxShadow: "none" } },
        ...props.slotProps,
      }}
    />
  );
}
//#endregion // * ------------ DateCalanderMenu ------------

//#region // * ------------ Calander ------------
function DateCalendarDropdown(props: DateCalendarProps) {
  const { close } = useDateCalendarDropdownContext()!;

  const handleChange: DateCalendarProps["onChange"] = (
    value,
    selectionState,
    selector,
  ) => {
    if (selectionState !== "finish") {
      return;
    }
     
    props.onChange?.(value, selectionState, selector);
    close();
  };

  return <DateCalendar {...props} onChange={handleChange} />;
}

//#endregion // * ------------ Calander ------------

export {
  DateCalanderProvider,
  DateCalanderMenu,
  DateCalanderTrigger,
  DateValueDisplay,
  DateCalendarDropdown,
};
