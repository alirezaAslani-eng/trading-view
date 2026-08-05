import type { Worksheet, Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { ExcelColumn } from "./types";

export async function downloadXlsx(config: {
  workbook: Workbook;
  filename: string;
}) {
  const { filename, workbook } = config;
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `${filename}.xlsx`,
  );
}

export function excelTableBuilder<TRow extends object>(config: {
  rows: TRow[];
  columns: ExcelColumn<TRow>[];
  worksheet: Worksheet;
}) {
  const { columns, rows, worksheet } = config;
  //@ts-ignore
  worksheet.columns = columns.map((col) => {
    const { render, ...rest } = col;
    return rest;
  });
  worksheet.addRows(
    rows.map((row) =>
      Object.fromEntries(
        columns.map((column) => [
          column.key,
          column.render
            ? column.render(row)
            : //@ts-ignore
              row[column.key],
        ]),
      ),
    ),
  );
}
