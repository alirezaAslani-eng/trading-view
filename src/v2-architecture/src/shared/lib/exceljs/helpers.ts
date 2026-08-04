import { type Workbook } from "exceljs";
import { saveAs } from "file-saver";

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
