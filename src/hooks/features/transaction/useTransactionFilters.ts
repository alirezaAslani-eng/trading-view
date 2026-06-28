import { useState } from "react";
import { TransactionFilters } from "@/types";
import { UseTransactionFiltersReturn } from "./types";

const INITIAL_FILTERS: TransactionFilters = {
  page: 1,
  pageSize: 10,
  TransactionType: null,
};

function useTransactionFilters(
  initialFilters?: Partial<TransactionFilters>,
): UseTransactionFiltersReturn {
  const initFilters = { ...INITIAL_FILTERS, ...initialFilters };

  const [filters, setFilters] = useState<TransactionFilters>(initFilters);

  const setFilter = <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // * a filter can have a pagination result so reset it
      ...(key !== "page" && { page: 1 }),
    }));
  };

  const resetFilters = () => {
    setFilters(initFilters);
  };

  const resetFilter = <K extends keyof TransactionFilters>(key: K) => {
    setFilters((prev) => ({
      ...prev,
      [key]: initFilters[key],
    }));
  };

  return {
    filters,
    setFilter,
    resetFilters,
    resetFilter,
  };
}

export default useTransactionFilters;
