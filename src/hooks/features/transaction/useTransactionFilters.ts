import useFilter from "@/hooks/app/useFilter";
import { TransactionFilters } from "@/types";
import { UseTransactionFiltersReturn } from "./types";

const INITIAL_FILTERS: TransactionFilters = {
  page: 1,
  pageSize: 10,
  Type: null,
  fromDate: null,
  toDate: null,
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
    filter.resetFilter("page");
  };

  const setFromDate = (fromDate: TransactionFilters["fromDate"]) => {
    filter.setFilter("fromDate", fromDate);
    filter.resetFilter("page");
  };

  const setToDate = (toDate: TransactionFilters["toDate"]) => {
    filter.setFilter("toDate", toDate);
    filter.resetFilter("page");
  };

  const setPage = (page: TransactionFilters["page"]) => {
    filter.setFilter("page", page);
  };

  return {
    setType,
    setPage,
    setFromDate,
    setToDate,
    ...filter,
  };
}

export default useTransactionFilters;
