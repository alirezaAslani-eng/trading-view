import { OrderStatus } from "@/types";

const ORDER_STATUS: Record<OrderStatus, OrderStatus> = {
  Active: "Active",
  AwaitingAdminApproval: "AwaitingAdminApproval",
  PartiallyFilled: "AwaitingAdminApproval",
  Filled: "Filled",
  Cancelled: "Cancelled",
  Failed: "Failed",
} as const;

export { ORDER_STATUS };
