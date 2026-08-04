function calculatePageCount(total: number, perPage: number) {
  return Math.ceil(total / perPage);
}
const DEFAULT_PAGE_SIZES = [10, 15, 20, 30, 40, 50, 100];

const getPageOptions = (totalCount: number): number[] => {
  const maxPageSize = DEFAULT_PAGE_SIZES.at(-1)!;

  if (totalCount < DEFAULT_PAGE_SIZES[1]) return [];

  const pageOptions = DEFAULT_PAGE_SIZES.filter((size) => size < totalCount);

  if (totalCount <= maxPageSize) {
    pageOptions.push(totalCount);
  }

  return [...new Set(pageOptions)];
};

export { calculatePageCount, getPageOptions };
