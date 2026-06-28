import { OrderFilters } from "@/types";

// * --start-- useOrderFilters.ts ----
interface UseOrderFiltersReturn {
  filters: OrderFilters;
  resetFilters: () => void;
  resetFilter: <K extends keyof OrderFilters>(key: K) => void;
  setFilter: <K extends keyof OrderFilters>(
    key: K,
    value: OrderFilters[K],
  ) => void;
}
// * --end-- useOrderFilters.ts ----

export type { UseOrderFiltersReturn };
