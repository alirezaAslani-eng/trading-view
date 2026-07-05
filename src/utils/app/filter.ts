// * Filter helpers
const SELECT_FILTER_ALL = "";

const filterToSelectValue = <TFilter extends string | null>(
  type: TFilter,
): string => type ?? SELECT_FILTER_ALL;

const selectValueToFilter = (value: string): null | string =>
  value === SELECT_FILTER_ALL ? null : value;

export { SELECT_FILTER_ALL, selectValueToFilter, filterToSelectValue };
