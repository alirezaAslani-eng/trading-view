import { TransactionFilters } from "@/types";

interface UseTransactionFiltersReturn {
  filters: TransactionFilters;
  resetFilters: () => void;
  resetFilter: <K extends keyof TransactionFilters>(key: K) => void;
  setFilter: <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => void;
}

export type { UseTransactionFiltersReturn };
