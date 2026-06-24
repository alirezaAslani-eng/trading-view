import { createContext, useCallback, useState } from "react";
import {
  OrderFiltersContextValue,
  OrderFiltersFilters,
  OrderFiltersProviderProps,
} from "./types";

const OrderFiltersContext = createContext<OrderFiltersContextValue | null>(
  null,
);

const INITIAL_FILTERS: OrderFiltersFilters = {
  page: 1,
  pageSize: 10,
};
/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */

function OrderFiltersProvider({ children }: OrderFiltersProviderProps) {
  /**
   * filter state.
   */
  const [filters, setFilters] = useState<OrderFiltersFilters>(INITIAL_FILTERS);

  /**
   * Update a single filter field.
   */
  const updateFilter = useCallback(
    <K extends keyof OrderFiltersFilters>(
      key: K,
      value: OrderFiltersFilters[K],
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

export { OrderFiltersContext, OrderFiltersProvider };
