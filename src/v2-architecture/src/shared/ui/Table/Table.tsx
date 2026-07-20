"use client";
import { legacyColors } from "@/v2-architecture/src/design-system";
import { columnSpacing } from "./helpers";
import { styled, Table as Table_ } from "@mui/material";

const rowSpace = "12px";
const columnSpace = "35.66px";
const asideSpace = "12px";

const Table = styled(Table_)(({ theme }) => ({
  // * TableCell Styles
  "& td, & th": {
    textAlign: "right",
    padding: "0px",
    border: "none",
    margin: "0px",
    fontSize: theme.typography.caption1.fontSize,
    fontFamily: theme.typography.caption1.fontFamily,
    lineHeight: theme.typography.caption1?.lineHeight,
    paddingTop: rowSpace,
    verticalAlign: "middle",
    ...columnSpacing(columnSpace, asideSpace),
  },
  "& tr td": {
    color: theme.palette.text.onPrimary,
  },
  "& tr th": {
    paddingBottom: rowSpace,
    borderBottom: "1px solid",
    borderColor: legacyColors["#2A2B2F"],
    whiteSpace: "nowrap",
    color: theme.palette.text.caption,
  },
  "& tbody tr:first-of-type td": {
    paddingTop: "24px",
  },
}));

export default Table;
