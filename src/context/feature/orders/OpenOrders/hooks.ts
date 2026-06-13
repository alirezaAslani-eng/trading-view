import { useContext, useMemo } from "react";
import { OpenOrdersActions, OpenOrdersFilters } from "./types";
import { OpenOrdersContext } from "./OpenOrdersContext";

function useOpenOrderActions(): OpenOrdersActions {
  const ctx = useContext(OpenOrdersContext)!;

  return useMemo(() => {
    return {
      updateFilter: ctx.resetFilters,
      resetFilters: ctx.resetFilters,
    };
  }, [ctx.resetFilters, ctx.updateFilter]);
}

function useOpenOrderFilters(): OpenOrdersFilters {
  const ctx = useContext(OpenOrdersContext)!;
  return ctx.filters;
}

export { useOpenOrderActions, useOpenOrderFilters };
