"use client";
import { LocalizationProvider as LocalizationProvider_ } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dayjs } from "@/packages/dayjs";
import { PropsWithChildren } from "react";

function LocalizationProvider(props: PropsWithChildren) {
  return (
    <LocalizationProvider_
      dateAdapter={AdapterDayjs}
      dateLibInstance={dayjs}
      adapterLocale="fa"
    >
      {props.children}
    </LocalizationProvider_>
  );
}

export default LocalizationProvider;
