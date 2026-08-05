import { OrderStatus } from "@/types";

const ORDER_STATUS: Record<OrderStatus, OrderStatus> = {
  Active: "Active",
  AwaitingAdminApproval: "AwaitingAdminApproval",
  PartiallyFilled: "AwaitingAdminApproval",
  Filled: "Filled",
  Cancelled: "Cancelled",
  Failed: "Failed",
} as const;
const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  Active: "در حال تکمیل",
  AwaitingAdminApproval: "در انتضار تایید ادمین",
  Cancelled: "لغو شده",
  Failed: "لغو شده",
  Filled: "تکمیل شده",
  PartiallyFilled: "در حال تکمیل",
};

export { ORDER_STATUS, ORDER_STATUS_LABEL };
