import { createContext, useCallback, useState } from "react";
import {
  OrderFiltersContextValue,
  OrderFilters,
  OrderFiltersProviderProps,
} from "./types";

const OpenOrderFiltersContext = createContext<OrderFiltersContextValue | null>(
  null,
);

const INITIAL_FILTERS: OrderFilters = {
  search: "",
  symbol: null,
  orderType: null,
  side: null,
  sort: null,
  onlyOpenOrders: false,
};
/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */

function OrderFiltersProvider({ children }: OrderFiltersProviderProps) {
  /**
   * filter state.
   */
  const [filters, setFilters] = useState<OrderFilters>(INITIAL_FILTERS);

  /**
   * Update a single filter field.
   */
  const updateFilter = useCallback(
    <K extends keyof OrderFilters>(key: K, value: OrderFilters[K]) => {
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

  return (
    <OpenOrderFiltersContext value={value}>{children}</OpenOrderFiltersContext>
  );
}

export { OpenOrderFiltersContext, OrderFiltersProvider };
