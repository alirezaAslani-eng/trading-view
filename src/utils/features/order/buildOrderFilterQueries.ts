import { OrderFilterQueries, OrderFilters } from "@/types";

function buildOrderFilterQueries(
  filterState: Omit<OrderFilters, "view">,
): Partial<OrderFilterQueries> {
  const { orderSide, page, pageSize, productCode, status } = filterState;

  const serialized = {
    ...(!!orderSide && { orderSide: String(orderSide) }),
    ...(!isNaN(page) && { page: String(page) }),
    ...(!isNaN(pageSize) && { pageSize: String(pageSize) }),
    ...(!!productCode && { productCode: String(productCode) }),
    ...(!!status && { status: String(status) }),
  };

  return serialized;
}

export default buildOrderFilterQueries;
