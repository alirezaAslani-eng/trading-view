import { OrderFilterQueries, OrderFilters } from "@/types";

function buildOrderFilterQueries(filterState: OrderFilters) {
  const {
    orderSide,
    page,
    pageSize,
    productCode,
    status,
    fromDate,
    toDate,
    view,
  } = filterState;

  const serialized = {
    ...(!!orderSide && { orderSide: String(orderSide) }),
    ...(!isNaN(page) && { page: String(page) }),
    ...(!isNaN(pageSize) && { pageSize: String(pageSize) }),
    ...(!!productCode && { productCode: String(productCode) }),
    ...(!!status && { status: String(status) }),
    ...(!!fromDate && { fromDate: fromDate.toISOString() }),
    ...(!!toDate && { toDate: toDate.toISOString() }),
    ...(!!view && { viewType: view }),
  } satisfies Partial<OrderFilterQueries>;

  return serialized;
}

export default buildOrderFilterQueries;
