import * as XLSX from "xlsx";

type ExportExcelProps<T> = {
  rows: T[];
  fileName: string;
};

function exportExcel<T>({ rows, fileName }: ExportExcelProps<T>) {
  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export default exportExcel;