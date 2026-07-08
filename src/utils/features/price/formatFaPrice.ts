const defaultOptions: Intl.NumberFormatOptions = {
  style: "decimal",
  maximumFractionDigits: 2,
  notation: "compact",
  minimumFractionDigits: 0,
  useGrouping: true,
};

function formatFaPrice(
  price: number | string | undefined | unknown,
  options?: Intl.NumberFormatOptions,
): string {
  const priceAsNumber = Number(price);

  if (!Number.isFinite(priceAsNumber)) return String(price);

  const mergedOptions: Intl.NumberFormatOptions = {
    ...defaultOptions,
    ...options,
  };

  return new Intl.NumberFormat("fa-IR", mergedOptions).format(priceAsNumber);
}

export default formatFaPrice;
