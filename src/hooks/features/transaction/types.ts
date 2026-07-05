import { TransactionFilters } from "@/types";

interface UseTransactionFiltersReturn {
  setType: (type: TransactionFilters["Type"]) => void;
  setPage: (type: TransactionFilters["page"]) => void;
  filters: TransactionFilters;
}

export type { UseTransactionFiltersReturn };
