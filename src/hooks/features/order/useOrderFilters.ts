import { OrderFilters } from "@/types";
import { useState } from "react";

const INITIAL_FILTERS: OrderFilters = {
  orderSide: "Buy",
  page: 1,
  pageSize: 10,
  type: "active",
  productCode: null,
  status: null,
};

function useOrderFilters(initialState?: Partial<OrderFilters>) {
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
    }));
  };

  /**
   * Reset all filters to their initial state.
   */
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilter,
    resetFilters,
  };
}

export default useOrderFilters;
