import { createContext, useCallback, useState } from "react";
import {
  OrderFiltersContextValue,
  OpenOrdersFilters,
  OpenOrdersProviderProps,
} from "./types";

const OrderFiltersContext = createContext<OrderFiltersContextValue | null>(
  null,
);

const INITIAL_FILTERS: OpenOrdersFilters = {
  page: 1,
  pageSize: 10,
};
/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */

function OpenOrdersProvider({ children }: OpenOrdersProviderProps) {
  /**
   * filter state.
   */
  const [filters, setFilters] = useState<OpenOrdersFilters>(INITIAL_FILTERS);

  /**
   * Update a single filter field.
   */
  const updateFilter = useCallback(
    <K extends keyof OpenOrdersFilters>(
      key: K,
      value: OpenOrdersFilters[K],
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFilters],
  );

  /**
   * Reset all filters to their initial state.
   */
  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  /**
   * context value.
   */
  const value = {
    filters,
    updateFilter,
    resetFilters,
  };

  return <OrderFiltersContext value={value}>{children}</OrderFiltersContext>;
}

export { OrderFiltersContext, OpenOrdersProvider };
