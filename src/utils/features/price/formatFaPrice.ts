const defaultOptions: Intl.NumberFormatOptions = {
  style: "decimal",
};
const compactOptions: Intl.NumberFormatOptions = {
  maximumFractionDigits: 2,
  notation: "compact",
  minimumFractionDigits: 0,
  useGrouping: true,
};

interface FormatPriceOptions extends Intl.NumberFormatOptions {
  compact?: boolean;
}

function formatFaPrice(
  price: number | string | undefined | unknown,
  { compact, ...options }: FormatPriceOptions = {},
): string {
  const priceAsNumber = Number(price);

  if (!Number.isFinite(priceAsNumber)) return String(price);

  const mergedOptions: Intl.NumberFormatOptions = {
    ...defaultOptions,
    ...(compact && compactOptions),
    ...options,
  };

  return new Intl.NumberFormat("fa-IR", mergedOptions).format(priceAsNumber);
}

export default formatFaPrice;
