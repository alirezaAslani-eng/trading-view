import { TransactionFilters } from "@/types";

interface UseTransactionFiltersReturn {
  setType: (type: TransactionFilters["Type"]) => void;
  setPage: (type: TransactionFilters["page"]) => void;
  setFromDate: (type: TransactionFilters["fromDate"]) => void;
  setToDate: (type: TransactionFilters["toDate"]) => void;
  filters: TransactionFilters;
}

export type { UseTransactionFiltersReturn };
