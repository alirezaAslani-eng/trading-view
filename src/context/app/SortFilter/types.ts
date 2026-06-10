import { SortComparingConfig } from "@/utils/app/sortCompairing";

type FieldPath = string;

type SortDirection = Required<SortComparingConfig>["direction"] | "NONE";

type SortState = {
  fieldPath: FieldPath;
  direction: SortDirection;
};

interface GetFieldStateReturn extends Record<
  "isSorted" | "isASC" | "isDESC",
  boolean
> {}

type TableSortContextValue = {
  sortState: SortState;
  setSort: (fieldPath: FieldPath, direction?: SortDirection) => void;
  toggleSort: (fieldPath: FieldPath) => void;
  sorter: <TItemToSort extends object>(data: TItemToSort[]) => TItemToSort[];
  getFieldState: (fieldPath: FieldPath) => GetFieldStateReturn;
};
type ProviderProps = {
  children: React.ReactNode;
  defaultFieldPath: FieldPath;
  defaultDirection?: SortDirection;
};

export type { ProviderProps, SortDirection, SortState, TableSortContextValue };
