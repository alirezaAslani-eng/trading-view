function formatPrecent(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("fa-IR", {
    style: "percent",
    minimumFractionDigits: 2,
    signDisplay: "exceptZero",
    ...options,
  }).format(value / 100);
}

export default formatPrecent;
