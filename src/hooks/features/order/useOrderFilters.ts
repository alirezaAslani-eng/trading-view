import { OrderFilters } from "@/types";
import { useState } from "react";

const INITIAL_FILTERS: OrderFilters = {
  orderSide: null,
  page: 1,
  pageSize: 10,
  view: "active",
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

  return {
    filters,
    setFilter,
    resetFilters,
  };
}

export default useOrderFilters;
