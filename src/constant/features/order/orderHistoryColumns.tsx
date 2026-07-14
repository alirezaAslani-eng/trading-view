import buildOrderColumns from "./orderColumns";

export const orderHistoryColumns = buildOrderColumns({
  include: [
    "date",
    "productCode",
    "orderSide",
    "orderType",
    "price",
    "totalWeight",
    "status",
  ],
});
