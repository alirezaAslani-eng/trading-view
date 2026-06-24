function calculatePageCount(total: number, perPage: number) {
  return Math.ceil(total / perPage);
}

export { calculatePageCount };
