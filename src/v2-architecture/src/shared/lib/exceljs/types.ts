import type ExcelJS from "exceljs";
export type ExcelColumn<TRow extends object> = Omit<
  Partial<ExcelJS.Column>,
  "key"
> & {
  key: keyof TRow;
  render?: (row: TRow) => string | number;
};
