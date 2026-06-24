import { createContext, useCallback, useState } from "react";
import {
  OpenOrdersContextValue,
  OpenOrdersFilters,
  OpenOrdersProviderProps,
} from "./types";

const OpenOrdersContext = createContext<OpenOrdersContextValue | null>(null);

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

  return <OpenOrdersContext value={value}>{children}</OpenOrdersContext>;
}

export { OpenOrdersContext, OpenOrdersProvider };
