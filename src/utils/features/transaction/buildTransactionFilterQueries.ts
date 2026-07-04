import { TransactionFilterQueries, TransactionFilters } from "@/types";

function buildTransactionFilterQueries(
  filterState: TransactionFilters,
): Partial<TransactionFilterQueries> {
  const { page, pageSize, Type } = filterState;

  const serialized = {
    ...(!isNaN(page) && { page: String(page) }),
    ...(!isNaN(pageSize) && { pageSize: String(pageSize) }),
    ...(!!Type && { Type: String(Type) }),
  };

  return serialized;
}

export default buildTransactionFilterQueries;
