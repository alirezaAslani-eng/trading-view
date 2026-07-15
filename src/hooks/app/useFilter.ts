import { useCallback, useState } from "react";

type UseFilterOptions<T extends Record<string, any>> = {
  initialState: T;
};

type SetFilterValue<T, K extends keyof T> =
  | T[K]
  | ((previousFilters: Readonly<T>) => T[K]);

function useFilter<T extends Record<string, any>>({
  initialState,
}: UseFilterOptions<T>) {
  /**
   * Filter state.
   */
  const [filters, setFilters] = useState<T>(initialState);

  /**
   * Update a single filter.
   */
  const setFilter = useCallback(
    <K extends keyof T>(key: K, value: SetFilterValue<T, K>) => {
      setFilters((prev) => {
        const nextValue =
          typeof value === "function"
            ? (value as (filters: Readonly<T>) => T[K])(prev)
            : value;

        return {
          ...prev,
          [key]: nextValue,
        };
      });
    },
    [],
  );

  /**
   * Reset all filters.
   */
  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  /**
   * Reset a single filter.
   */
  const resetFilter = useCallback(
    <K extends keyof T>(key: K) => {
      setFilters((prev) => ({
        ...prev,
        [key]: initialState[key],
      }));
    },
    [initialState],
  );

  return {
    filters,
    setFilter,
    resetFilter,
    resetFilters,
  };
}

export default useFilter;