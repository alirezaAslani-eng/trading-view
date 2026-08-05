import { Order, Transaction } from "@/api/types";
import { Workbook, Worksheet } from "exceljs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  downloadXlsx,
  ExcelColumn,
  excelTableBuilder,
} from "@/v2-architecture/src/shared/lib/exceljs";
import { ordersBaseColumns } from "@/constant/features/order/orderBaseColumns";
import { transactionsBaseColumns } from "@/constant/features/transaction/transactionBaseColumns";
//#region // * ------------ Excel ------------
// * Orders
export async function exportOrdersExcel(orders: Order[]) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("سفارش‌ها");

  excelTableBuilder({
    worksheet,
    rows: orders,
    columns: getOrderExcelColumns(),
  });
  applyGlobalStyle(worksheet);
  return downloadXlsx({ workbook, filename: "orders" });
}

// * Trnsactions
export async function exportTransactionsExcel(transactions: Transaction[]) {
  const workbook = new Workbook();

  const worksheet = workbook.addWorksheet("تراکنش ها");
  excelTableBuilder({
    worksheet,
    columns: getTransactionExcelColumns(),
    rows: transactions,
  });
  applyGlobalStyle(worksheet);

  return downloadXlsx({ workbook, filename: "transactions" });
}
function getOrderExcelColumns(): ExcelColumn<Order>[] {
  return Object.values(ordersBaseColumns).map((column) => {
    return {
      header: column.headerName,
      key: column.key,
      render: column.content,
    };
  });
}
function getTransactionExcelColumns(): ExcelColumn<Transaction>[] {
  return Object.values(transactionsBaseColumns).map((column) => {
    return {
      header: column.headerName,
      key: column.key,
      render: column.content,
    };
  });
}
// * Excel Styles
function applyGlobalStyle(worksheet: Worksheet) {
  autoFitColumns(worksheet);

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = {
        name: "Benyamin",
        size: 12,
      };

      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
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
//#endregion // * ------------ Excel ------------

//#region // * ------------ PDF ------------
// * Orders
export function exportOrdersPDF(orders: Order[]) {
  const doc = new jsPDF();
  autoTable(doc, {
    columns: getOrderPdfColumns(),
    body: transformOrdersForPdf(orders),
  });

  doc.save("users.pdf");
}

function getOrderPdfColumns() {
  const baseColumns = ordersBaseColumns;

  return Object.values(baseColumns).map((column) => ({
    header: column.headerName,
    dataKey: column.key,
  }));
}
function transformOrdersForPdf(rows: Order[]) {
  const baseColumns = ordersBaseColumns;

  return rows.map((row) => {
    return Object.entries(baseColumns).reduce(
      (acc, [key, column]) => {
        acc[key] = column.content(row);

        return acc;
      },
      {} as Record<string, string | number>,
    );
  });
}
// * Transactions
export function exportTransactionsPDF(transactions: Transaction[]) {
  const doc = new jsPDF();

  autoTable(doc, {
    columns: getTransactionPdfColumns(),
    body: transformTransactionsForPdf(transactions),
  });

  doc.save("transactions.pdf");
}

function getTransactionPdfColumns() {
  const baseColumns = transactionsBaseColumns;

  return Object.values(baseColumns).map((column) => ({
    header: column.headerName,
    dataKey: column.key,
  }));
}

function transformTransactionsForPdf(rows: Transaction[]) {
  const baseColumns = transactionsBaseColumns;

  return rows.map((row) => {
    return Object.entries(baseColumns).reduce(
      (acc, [key, column]) => {
        acc[key] = column.content(row);

        return acc;
      },
      {} as Record<string, string | number>,
    );
  });
}

//#endregion // * ------------ PDF ------------
