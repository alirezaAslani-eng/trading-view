import { OrderStatus, OrderStatusClient } from "@/types";

const orderStatusMap: Record<OrderStatus, OrderStatusClient> = {
  Active: "pending",
  AwaitingAdminApproval: "pending",
  PartiallyFilled: "pending",
  Filled: "filled",
  Cancelled: "failed",
  Failed: "failed",
};

function normalizeOrderStatus(status: OrderStatus) {
  return {
    status: orderStatusMap[status],
    isPending: orderStatusMap[status] === "pending",
    isFaild: orderStatusMap[status] === "failed",
    isFilled: orderStatusMap[status] === "filled",
  };
}

export default normalizeOrderStatus;
