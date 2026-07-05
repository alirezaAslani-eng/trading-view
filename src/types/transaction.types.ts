import { OrderView } from "@/api/types";
import { PaginationFilter, PaginationFilterQueries } from "./filter.types";
import { TransactionType } from "@/constant/features/transaction/transactionType";

interface TransactionFilters extends PaginationFilter {
  Type: null | TransactionType;
}
type TransactionFilterQueryKeys = "Type";

type TransactionFilterQueries = PaginationFilterQueries &
  Record<TransactionFilterQueryKeys, string>;

export type { TransactionFilters, TransactionFilterQueries };
