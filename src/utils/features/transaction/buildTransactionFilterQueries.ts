import { TransactionFilterQueries, TransactionFilters } from "@/types";

function buildTransactionFilterQueries(
  filterState: TransactionFilters,
): Partial<TransactionFilterQueries> {
  const { page, pageSize, Type, fromDate, toDate } = filterState;

  const serialized = {
    ...(!isNaN(page) && { page: String(page) }),
    ...(!isNaN(pageSize) && { pageSize: String(pageSize) }),
    ...(!!Type && { Type: String(Type) }),
    ...(!!fromDate && { fromDate: String(fromDate) }),
    ...(!!toDate && { toDate: String(toDate) }),
  };

  return serialized;
}

export default buildTransactionFilterQueries;
