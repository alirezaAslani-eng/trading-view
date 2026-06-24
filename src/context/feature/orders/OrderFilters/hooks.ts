import { useContext } from "react";
import { OrderFiltersContext } from "./OrderFiltersContext";

function useOrderFilters() {
  const ctx = useContext(OrderFiltersContext)!;
  return ctx;
}

export { useOrderFilters };
