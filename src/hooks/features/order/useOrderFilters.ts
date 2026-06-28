import { OrderFilters } from "@/types";
import { useState } from "react";
import { UseOrderFiltersReturn } from "./types";

const INITIAL_FILTERS: OrderFilters = {
  orderSide: null,
  page: 1,
  pageSize: 10,
  view: "active",
  productCode: null,
  status: null,
};

function useOrderFilters(
  initialState?: Partial<OrderFilters>,
): UseOrderFiltersReturn {
  /**
   * overridable default filters.
   */
  const initialFilters = {
    ...INITIAL_FILTERS,
    ...initialState,
  };
  /**
   * filter state.
   */
  const [filters, setFilters] = useState<OrderFilters>(initialFilters);

  /**
   * Update a single filter field.
   */
  const setFilter = <K extends keyof OrderFilters>(
    key: K,
    value: OrderFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // * ant filter can have a pagination result so reset it
      ...(key !== "page" && { page: 1 }),
    }));
  };

  /**
   * Reset all filters to their initial state.
   */
  const resetFilters = () => {
    setFilters(initialFilters);
  };
  /**
   * Reset a single filter to their initial state.
   */
  const resetFilter = <K extends keyof OrderFilters>(key: K) => {
    setFilters((prev) => ({
      ...prev,
      [key]: initialFilters[key],
    }));
  };

  return {
    filters,
    setFilter,
    resetFilters,
    resetFilter,
  };
}

export default useOrderFilters;
