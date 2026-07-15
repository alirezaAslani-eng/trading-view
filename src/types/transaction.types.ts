import { OrderView } from "@/api/types";
import {
  DateFilter,
  PaginationFilter,
  PaginationFilterQueries,
} from "./filter.types";
import { TransactionType } from "@/constant/features/transaction/transactionType";

type TransactionFilters = PaginationFilter &
  DateFilter & {
    Type: null | TransactionType;
  };
type TransactionFilterQueryKeys = "Type";

type TransactionFilterQueries = PaginationFilterQueries &
  Record<TransactionFilterQueryKeys, string>;

export type { TransactionFilters, TransactionFilterQueries };
