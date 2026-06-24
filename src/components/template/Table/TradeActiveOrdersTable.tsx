"use client";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { Order } from "@/api/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import normalizeOrderStatus from "@/utils/features/order/normalizeOrderStatus";
import { useActiveOrders } from "@/context/feature/orders/ActiveOrders/ActiveOrdersContext";
import { Box } from "@mui/material";
import { calculatePageCount } from "@/utils/app/pagination";
import OrdersPagination from "@/components/template/Pagination/OrdersPagination";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

const columns: Column<Order>[] = [
  {
    field: "date",
    headerName: "تاریخ",
    renderCell(row) {
      return convertToJalali(row.date).format(JALALI_FORMAT);
    },
  },
  {
    field: "productCode",
    headerName: "نماد",
  },
  {
    field: "orderSide",
    headerName: "سمت",
    renderCell(row) {
      const isBuy = row.orderSide === "Buy";
      return isBuy ? "فروشنده" : "خریدار";
    },
  },
  {
    field: "orderType",
    headerName: "نوع سفارش",
    renderCell(row) {
      return (
        <>
          {row.orderType === "Limit" && "تعین قیمت"}
          {row.orderType === "Market" && "فوری"}
        </>
      );
    },
  },
  {
    field: "price",
    headerName: "قیمت",
  },
  {
    field: "weight",
    headerName: "وزن",
  },
  {
    field: "status",
    headerName: "وضعیت",
    renderCell(row) {
      const { isFaild, isFilled, isPending } = normalizeOrderStatus(row.status);

      const color = isFaild
        ? "error"
        : isFilled || isPending
          ? "success"
          : "success";

      return (
        <StatusBadge color={color}>
          {isFaild && "لغو شد"}
          {isFilled && "تکمیل شد"}
          {isPending && "در حال تکمیل"}
        </StatusBadge>
      );
    },
  },
  {
    headerName: "عملیات",
    renderCell(row) {
      return <ButtonTableAction>{"لغو"}</ButtonTableAction>;
    },
  },
];

function TradeActiveOrdersTable() {
  const query = useActiveOrders();
  return (
    <>
      <FallbackHandler
        isLoading={query.isLoading}
        isError={query.isError}
        dataLength={query.data?.items.length}
        fallbacks={{
          loader: <TableFallbackLoader columns={columns} />,
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
        }}
      />

      {query.isSuccess && (
        <DataTable columns={columns} rows={query.data.items} />
      )}

      {query.isSuccess && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
          <OrdersPagination
            pageCount={calculatePageCount(
              query.data.totalCount,
              query.data.pageSize,
            )}
          />
        </Box>
      )}
    </>
  );
}

export default TradeActiveOrdersTable;
