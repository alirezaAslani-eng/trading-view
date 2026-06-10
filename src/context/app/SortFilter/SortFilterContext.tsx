"use client";
import { createContext, useContext, useMemo, useState } from "react";
import sortComparing from "@/utils/app/sortCompairing";
import {
  ProviderProps,
  SortDirection,
  SortState,
  TableSortContextValue,
} from "./types";
import objectGetter from "@/utils/app/objectGetter";

const directionOrder: Record<SortDirection, SortDirection> = {
  NONE: "ASC",
  ASC: "DESC",
  DESC: "NONE",
};
const TableSortContext = createContext<TableSortContextValue | null>(null);

function SortFilterProvider({
  children,
  defaultFieldPath,
  defaultDirection = "NONE",
}: ProviderProps) {
  // * ------------ Sort state ------------
  const [sortState, setSortState] = useState<SortState>({
    fieldPath: defaultFieldPath,
    direction: defaultDirection,
  });

  // * ------ sortState dispatchers ------
  const setSort = (fieldPath: string, direction?: SortDirection) => {
    setSortState((prev) => ({
      fieldPath,
      direction: direction ?? prev.direction,
    }));
  };
  const toggleSort = (fieldPath: string) => {
    setSortState((prev) => {
      if (prev.fieldPath !== fieldPath) {
        return {
          fieldPath,
          direction: "ASC",
        };
      }
      return {
        fieldPath,
        direction: directionOrder[prev.direction],
      };
    });
  };

  // * ------ Get single field's state ------
  function getFieldState(fieldPath: string) {
    const { fieldPath: activePath, direction } = sortState;
    return {
      isSorted: activePath === fieldPath && direction !== "NONE",
      isASC: activePath === fieldPath && direction === "ASC",
      isDESC: activePath === fieldPath && direction === "DESC",
    };
  }

  // * ------ Sorter data transformer ------
  const sorter = <K extends object>(data: K[]) => {
    const { fieldPath, direction } = sortState;
    if (direction === "NONE") return data;
    return [...data].sort((a, b) => {
      const aValue = objectGetter({ obj: a, path: fieldPath });
      const bValue = objectGetter({ obj: b, path: fieldPath });
      return sortComparing({ a: aValue, b: bValue, direction });
    });
  };

  const value: TableSortContextValue = useMemo(
    () => ({
      sortState,
      setSort,
      toggleSort,
      sorter,
      getFieldState,
    }),
    [sortState],
  );

  return <TableSortContext value={value}>{children}</TableSortContext>;
}

function useSortFilter() {
  const ctx = useContext(TableSortContext);

  if (!ctx) {
    throw new Error("useSortFilter must be used inside SortFilterProvider");
  }

  return ctx as TableSortContextValue;
}

export { SortFilterProvider, useSortFilter };
