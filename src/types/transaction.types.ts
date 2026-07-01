import { OrderView } from "@/api/types";
import { PaginationFilter } from "./filter.types";
import { TransactionType } from "@/constant/features/transaction/transactionType";

interface TransactionFilters extends PaginationFilter {
  Type: null | TransactionType;
}

export type { TransactionFilters };
