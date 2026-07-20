export default function calculatePaginationCount(
  total: number,
  perPage: number
) {
  return Math.ceil(total / perPage);
}
