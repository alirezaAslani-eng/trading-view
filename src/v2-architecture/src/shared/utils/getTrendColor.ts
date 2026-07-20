type TrendColorOptions = {
  positive?: string;
  negative?: string;
  zero?: string;
};

const getTrendColor = (value: number, options?: TrendColorOptions): string => {
  const {
    positive = "text.profit",
    negative = "status.loss",
    zero = "text.secondary",
  } = options ?? {};

  if (value > 0) {
    return positive;
  }

  if (value < 0) {
    return negative;
  }

  return zero;
};

export default getTrendColor;
