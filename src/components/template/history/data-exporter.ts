import { Order, Transaction } from "@/api/types";
import { Workbook, Worksheet } from "exceljs";
import { jsPDF } from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";
import {
  downloadXlsx,
  ExcelColumn,
  excelTableBuilder,
} from "@/v2-architecture/src/shared/lib/exceljs";
import { ordersBaseColumns } from "@/constant/features/order/orderBaseColumns";
import { transactionsBaseColumns } from "@/constant/features/transaction/transactionBaseColumns";
import { vazirFont } from "./pdf-font";

//#region // * ------------ Helpers ------------

function createPersianPDF(): jsPDF {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a3",
  });

  doc.addFileToVFS("Vazirmatn.ttf", vazirFont);
  doc.addFont("Vazirmatn.ttf", "Vazirmatn", "normal");
  doc.setFont("Vazirmatn");

  return doc;
}

const persianAutoTableStyles: Partial<UserOptions> = {
  showHead: "firstPage",
  styles: {
    font: "Vazirmatn",
    fontStyle: "normal",
    fontSize: 9,
    halign: "right",
    cellPadding: 3,
  },
  headStyles: {
    font: "Vazirmatn",
    fontStyle: "normal",
    fontSize: 10,
    halign: "right",
    fillColor: [240, 240, 240],
    textColor: [0, 0, 0],
  },
};

/**
 * افزودن بنر متنی اکسل:
 * ایجاد فضای خالی در بالای شیت، ادغام سلول‌ها و اعمال استایل تیره با متن سفید در مرکز
 */
function addExcelHeaderBanner(
  worksheet: Worksheet,
  columnCount: number,
  title: string
) {
  const headerRowsCount = 4;
  const maxCol = Math.max(columnCount, 6);

  // شیفت دادن سطرهای جدول به پایین
  worksheet.spliceRows(1, 0, ...Array(headerRowsCount).fill([]));

  // Merge سلول‌های سطر ۲ و ۳ روی تمامی ستون‌ها
  worksheet.mergeCells(2, 1, 3, maxCol);

  const bannerCell = worksheet.getCell(2, 1);
  bannerCell.value = title;

  // استایل‌دهی تیره
  bannerCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E1E1E" },
  };

  bannerCell.font = {
    name: "Benyamin",
    size: 16,
    bold: true,
    color: { argb: "FFFFFFFF" },
  };

  bannerCell.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.getRow(2).height = 24;
  worksheet.getRow(3).height = 24;
}

/**
 * افزودن بنر متنی PDF:
 * رسم مستطیل دودی/مشکی متناسب با عرض A3 و درج عنوان سفید در مرکز آن
 */
function addPdfHeaderBanner(doc: jsPDF, title: string): number {
  const marginX = 15;
  const marginY = 12;

  // عرض ناحیه چاپ در صفحه A3 Landscape = 390mm
  const fullPrintableWidth = 390;
  const bannerHeight = 25;

  // پس‌زمینه تیره
  doc.setFillColor(30, 30, 30);
  doc.rect(marginX, marginY, fullPrintableWidth, bannerHeight, "F");

  // متن سفید
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);

  const textX = marginX + fullPrintableWidth / 2;
  const textY = marginY + bannerHeight / 2 + 3;

  doc.text(title, textX, textY, { align: "center" });

  // ریست کردن رنگ متن به حالت اولیه برای جدول
  doc.setTextColor(0, 0, 0);

  return marginY + bannerHeight + 10;
}
//#endregion

//#region // * ------------ Excel ------------

export async function exportOrdersExcel(orders: Order[]) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("سفارش‌ها");
  const columns = getOrderExcelColumns();

  excelTableBuilder({
    worksheet,
    rows: orders,
    columns,
  });

  addExcelHeaderBanner(worksheet, columns.length, "گزارش لیست سفارش‌ها");

  applyGlobalStyle(worksheet);
  return downloadXlsx({ workbook, filename: "orders" });
}

export async function exportTransactionsExcel(transactions: Transaction[]) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("تراکنش ها");
  const columns = getTransactionExcelColumns();

  excelTableBuilder({
    worksheet,
    columns,
    rows: transactions,
  });

  addExcelHeaderBanner(worksheet, columns.length, "گزارش لیست تراکنش‌ها");

  applyGlobalStyle(worksheet);

  return downloadXlsx({ workbook, filename: "transactions" });
}

function getOrderExcelColumns(): ExcelColumn<Order>[] {
  return Object.values(ordersBaseColumns).map((column) => ({
    header: column.headerName,
    key: column.key,
    render: column.content,
  }));
}

function getTransactionExcelColumns(): ExcelColumn<Transaction>[] {
  return Object.values(transactionsBaseColumns).map((column) => ({
    header: column.headerName,
    key: column.key,
    render: column.content,
  }));
}

function applyGlobalStyle(worksheet: Worksheet) {
  autoFitColumns(worksheet);

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = { name: "Benyamin", size: 12 };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
  });
}

function autoFitColumns(worksheet: Worksheet) {
  worksheet.columns.forEach((column, columnIndex) => {
    let maxLength = 0;

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      const cell = row.getCell(columnIndex + 1);
      const value = cell.value?.toString() ?? "";
      maxLength = Math.max(maxLength, value.length);
    });

    const padding = 8;
    column.width = Math.max(maxLength + padding, 12);
  });
}
//#endregion

//#region // * ------------ PDF ------------

export function exportOrdersPDF(orders: Order[]) {
  const doc = createPersianPDF();
  const startY = addPdfHeaderBanner(doc, "گزارش لیست سفارش‌ها");

  autoTable(doc, {
    ...persianAutoTableStyles,
    startY,
    columns: getOrderPdfColumns(),
    body: transformOrdersForPdf(orders),
  });

  doc.save("orders.pdf");
}

export function exportTransactionsPDF(transactions: Transaction[]) {
  const doc = createPersianPDF();
  const startY = addPdfHeaderBanner(doc, "گزارش لیست تراکنش‌ها");

  autoTable(doc, {
    ...persianAutoTableStyles,
    startY,
    columns: getTransactionPdfColumns(),
    body: transformTransactionsForPdf(transactions),
  });

  doc.save("transactions.pdf");
}

function getOrderPdfColumns() {
  return Object.values(ordersBaseColumns).map((column) => ({
    header: column.headerName,
    dataKey: column.key,
  }));
}

function transformOrdersForPdf(rows: Order[]) {
  return rows.map((row) =>
    Object.entries(ordersBaseColumns).reduce(
      (acc, [key, column]) => {
        acc[key] = column.content(row);
        return acc;
      },
      {} as Record<string, string | number>,
    ),
  );
}

function getTransactionPdfColumns() {
  return Object.values(transactionsBaseColumns).map((column) => ({
    header: column.headerName,
    dataKey: column.key,
  }));
}

function transformTransactionsForPdf(rows: Transaction[]) {
  return rows.map((row) =>
    Object.entries(transactionsBaseColumns).reduce(
      (acc, [key, column]) => {
        acc[key] = column.content(row);
        return acc;
      },
      {} as Record<string, string | number>,
    ),
  );
}
//#endregion