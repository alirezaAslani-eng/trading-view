import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Table from "./Table";
import { ReactNode } from "react";
import ScrollContainer from "../ScrollContainer/ScrollContainer";

type Column<T> = {
  field?: keyof T;
  headerName: ReactNode;
  align?: "left" | "center" | "right";
  renderCell?: (row: T) => React.ReactNode;
};

type Row<T> = { id?: string | number } & T;

type CustomTableProps<T> = {
  columns: Column<T>[];
  rows?: Row<T>[];
};

function DataTable<T extends object>({
  columns,
  rows = [],
}: CustomTableProps<T>) {
  return (
    <ScrollContainer sx={{ pb: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map?.((column, index) => (
              <TableCell
                key={String(column?.field ?? index)}
                align={column.align}
              >
                <>{column.headerName}</>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.map?.((row, index) => (
            <TableRow key={row?.id ?? index}>
              {columns?.map((column, index) => (
                <TableCell
                  key={String(column.field ?? index)}
                  align={column.align}
                >
                  <>
                    {column.renderCell
                      ? column.renderCell(row)
                      : row[column.field as keyof T]}
                  </>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollContainer>
  );
}

export default DataTable;
export type { Column };
