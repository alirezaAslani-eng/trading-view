import useFilter from "@/hooks/app/useFilter";
import { TransactionFilters } from "@/types";
import { UseTransactionFiltersReturn } from "./types";

const INITIAL_FILTERS: TransactionFilters = {
  page: 1,
  pageSize: 10,
  Type: null,
};

function useTransactionFilters(
  initialState?: Partial<TransactionFilters>,
): UseTransactionFiltersReturn {
  const filter = useFilter<TransactionFilters>({
    initialState: {
      ...INITIAL_FILTERS,
      ...initialState,
    },
  });

  const setType = (type: TransactionFilters["Type"]) => {
    filter.setFilter("Type", type);
  };
  const setPage = (page: TransactionFilters["page"]) => {
    filter.setFilter("page", page);
  };

  return {
    setType,
    setPage,
    ...filter,
  };
}

export default useTransactionFilters;
