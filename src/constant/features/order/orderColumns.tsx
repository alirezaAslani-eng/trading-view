import { Column } from "@/components/ui/Table/DataTable";
import { Order } from "@/api/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { formatFaPrice } from "@/utils";
import normalizeOrderStatus from "@/utils/features/order/normalizeOrderStatus";
import { Typography } from "@mui/material";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";

type DefaultColumns = DefColumns<Order>;

export const orderTableColumns: DefaultColumns = {
  date: {
    headerName: "زمان",
    field: "date",
    renderCell(row) {
      return convertToJalali(row.date).format(JALALI_FORMAT);
    },
  },
  productCode: {
    headerName: "نماد",
    field: "productCode",
  },
  orderSide: {
    headerName: "سمت",
    renderCell(row) {
      const isSeller = row.orderSide === "Sell";
      return isSeller ? "فروشنده" : "خریدار";
    },
  },
  orderType: {
    headerName: "نوع",
    renderCell(row) {
      const isLimit = row.orderType === "Limit";
      return isLimit ? "تعیین قیمت" : "فوری";
    },
  },
  price: {
    headerName: "قیمت",
    renderCell(row) {
      return formatFaPrice(row.price);
    },
  },
  weight: {
    headerName: "مقدار",
    renderCell(row) {
      return `${row.weight} کیلو`;
    },
  },
  status: {
    headerName: "وضعیت",
    renderCell(row) {
      const { isFaild, isPending, isFilled } = normalizeOrderStatus(row.status);
      const color = isFaild
        ? "status.loss"
        : isPending
          ? "status.warning"
          : "text.profit";

      return (
        <Typography variant="caption1" sx={{ color }}>
          {isPending && "در حال تکمیل"}
          {isFaild && "تکمیل"}
          {isFilled && "تکمیل"}
        </Typography>
      );
    },
  },
};

const buildOrderColumns = (
  options?: BuildColumnsOptions<Order, DefaultColumns>,
): Column<Order>[] => {
  return buildColumns<Order>(orderTableColumns, options);
};

export default buildOrderColumns;
