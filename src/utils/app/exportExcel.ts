import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
type ExportExcelProps<T> = {
  rows: T[];
  fileName: string;
  title?: string;
};
export async function exportExcel<T extends object>({
  rows,
  fileName,
  title = "گزارش",
}: ExportExcelProps<T>) {const workbook = new ExcelJS.Workbook();

const worksheet = workbook.addWorksheet("Report");
workbook.creator = "Admin";
//@ts-ignore
workbook.company = "My Company";

workbook.created = new Date();
// لوگو
worksheet.mergeCells("A1:A2");

// عنوان
worksheet.mergeCells("B1:G2");
worksheet.getRow(1).height = 35;
worksheet.getRow(2).height = 35;

const titleCell = worksheet.getCell("B1");

titleCell.value = title;

titleCell.font = {
  name: "Arial",
  size: 24,
  bold: true,
  color: {
    argb: "FFFFFFFF",
  },
};

titleCell.alignment = {
  horizontal: "center",
  vertical: "middle",
};

titleCell.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: {
    argb: "FF1976D2",
  },
};

const logoCell = worksheet.getCell("A1");

logoCell.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: {
    argb: "1976D2",
  },
};


const headers = Object.keys(rows[0] ?? {});

worksheet.addRow([]);

worksheet.addRow(headers);
const headerRow = worksheet.getRow(4);

headerRow.height = 28;

headerRow.eachCell((cell) => {
  cell.font = {
    bold: true,
    color: {
      argb: "FFFFFF",
    },
  };

  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1565C0",
    },
  };

  cell.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  cell.border = {
    top: {
      style: "thin",
    },
    left: {
      style: "thin",
    },
    right: {
      style: "thin",
    },
    bottom: {
      style: "thin",
    },
  };
});
rows.forEach((item) => {
  worksheet.addRow(Object.values(item));
});
worksheet.eachRow((row, rowNumber) => {
  if (rowNumber <= 4) return;

  row.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
    };

    if (rowNumber % 2 === 0) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "F4F6F8",
        },
      };
    }
  });
});
worksheet.columns.forEach((column) => {
  column.width = 15
});
worksheet.eachRow((row) => {
  row.height = 25;
});
worksheet.views = [
  {
    state: "frozen",
    ySplit: 4,
  },
];
worksheet.autoFilter = {
  from: "A4",
  to: "F4",
};
worksheet.eachRow((row) => {
  row.eachCell((cell) => {
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
  });
});
worksheet.getColumn(3).numFmt = "#,##0";

worksheet.getColumn(4).numFmt = "#,##0.00";

worksheet.getColumn(5).numFmt = "#,##0";
worksheet.getColumn(3).eachCell((cell) => {
  // cell.font = {
  //   color: {
  //     argb: "2E7D32",
  //   },
  // };
});
const response = await fetch("/images/logoexel.png");

const blob = await response.blob();

const imageBuffer = await blob.arrayBuffer();

const imageId = workbook.addImage({
  buffer: imageBuffer,
  extension: "png",
});

worksheet.addImage(imageId, {
  tl: {
    col: 0.98,
    row: 0.25
  },
  ext: {
    width: 55,
    height: 55,
  },
});

// ساخت فایل اکسل
const excelBuffer = await workbook.xlsx.writeBuffer();

saveAs(
  new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  }),
  `${fileName}.xlsx`,
);}