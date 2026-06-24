import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import Table from "../Table/Table";
import { Column } from "../Table/DataTable";
import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  Skeleton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function TableFallback(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        ...props.sx,
      }}
    />
  );
}

function TableFallbackData(props: ReplaceSxWithSxOnlyObject<TypographyProps>) {
  return (
    <Typography
      {...props}
      variant="body2"
      sx={{ color: "text.disabled", ...props.sx }}
    >
      {props.children ?? "داده ای وجود ندارد"}
    </Typography>
  );
}

type TableFallbackLoaderProps = {
  columns?: Column<any>[];
  rowsCount?: number;
};
function TableFallbackLoader({
  columns = [],
  rowsCount = 10,
}: TableFallbackLoaderProps) {
  const columnsLength = columns.length;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rowsCount }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: columnsLength }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant="rounded" width={"100%"} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { TableFallback, TableFallbackLoader, TableFallbackData };
