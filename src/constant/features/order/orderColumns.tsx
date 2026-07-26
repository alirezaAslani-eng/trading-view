import { Column } from "@/components/ui/Table/DataTable";
import { Order } from "@/api/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { formatFaPrice, formatPrecent } from "@/utils";
import normalizeOrderStatus from "@/utils/features/order/normalizeOrderStatus";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { WEIGHT_UNITS } from "../product/weightUnits";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";
import CancleOrderTableAction from "@/components/template/Button/CancleOrderTableAction";

type DefaultColumns = DefColumns<Order>;
const weightUnit = WEIGHT_UNITS.KG.lable;
export const orderTableColumns: DefaultColumns = {
  date: {
    headerName: "تاریخ",
    field: "date",
    renderCell(row) {
      const time = convertToJalali(row.date).format("HH:MM");
      const date = convertToJalali(row.date).format(JALALI_FORMAT);
      return `${date} | ${time}`;
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
      return (
        <Typography
          variant="inherit"
          sx={{ color: isSeller ? "status.loss" : "text.profit" }}
        >
          {isSeller ? "فروشنده" : "خریدار"}
        </Typography>
      );
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
  totalWeight: {
    headerName: "وزن کل",
    renderCell(row) {
      return `${row.totalWeight} ${weightUnit}`;
    },
  },
  filledWeight: {
    headerName: "وزن پر شده",
    renderCell(row) {
      return `${row.filledWeight} ${weightUnit}`;
    },
  },
  remainingWeight: {
    headerName: "وزن باقی مانده",
    renderCell(row) {
      return `${row.remainingWeight} ${weightUnit}`;
    },
  },
  progress: {
    headerName: "درصد پر شده",
    renderCell(row) {
      return <Progress value={row.progress} />;
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
          {isFaild && "لغو"}
          {isFilled && "تکمیل"}
        </Typography>
      );
    },
  },
};

const buildOrderColumns = (
  options?: BuildColumnsOptions<Order, DefaultColumns>
): Column<Order>[] => {
  return buildColumns<Order>(orderTableColumns, {
    ...options,
    extra: [
      {
        headerName: "عملیات",
        renderCell(row) {
          return (
            <CancleOrderTableAction
              orderId={row.orderId}
              disabled={normalizeOrderStatus(row.status).isDone}
            />
          );
        },
      },
      ...(options?.extra ?? []),
    ],
  });
};

export default buildOrderColumns;

type ProgressProps = CircularProgressProps & {
  value: number;
};

function Progress({ value, ...props }: ProgressProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        {...props}
        sx={{ color: progressColor(value) }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ lineHeight: 1, color: "text.onPrimary" }}
        >
          {Math.round(value)}%
        </Typography>
      </Box>
    </Box>
  );
}

function progressColor(progress: number) {
  if (progress <= 10) return "status.loss";
  if (progress <= 30) return "status.warning";
  if (progress <= 50) return "text.primary2";
  return "status.profit";
}
