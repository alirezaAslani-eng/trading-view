import { OrderFilters } from "@/types";

// * --start-- useOrderFilters.ts ----
interface UseOrderFiltersReturn {
  setView: (view: OrderFilters["view"]) => void;
  setSide: (side: OrderFilters["orderSide"]) => void;
  setSymbol: (productCode: OrderFilters["productCode"]) => void;
  setStatus: (status: OrderFilters["status"]) => void;
  setFromDate: (date: OrderFilters["fromDate"]) => void;
  setToDate: (date: OrderFilters["toDate"]) => void;
  setPage: (page: OrderFilters["page"]) => void;
  filters: OrderFilters;
}
// * --end-- useOrderFilters.ts ----

export type { UseOrderFiltersReturn };
