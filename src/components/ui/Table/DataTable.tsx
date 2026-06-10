import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Table from "./Table";
import { ReactNode } from "react";

type Column<T> = {
  field?: keyof T;
  headerName: ReactNode;
  align?: "left" | "center" | "right";
  renderCell?: (row: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  columns: Column<T>[];
  rows?: T[];
};

function DataTable<T extends { id: string | number }>({
  columns,
  rows = [],
}: CustomTableProps<T>) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns?.map?.((column) => (
            <TableCell key={String(column.field)} align={column.align}>
              <>{column.headerName}</>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows?.map?.((row) => (
          <TableRow key={row?.id ?? ""}>
            {columns.map((column) => (
              <TableCell
                key={String(column.field ?? column.headerName)}
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
  );
}

export default DataTable;
export type { Column };
