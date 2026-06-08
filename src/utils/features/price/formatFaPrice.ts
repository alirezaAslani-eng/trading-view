function formatFaPrice(price: number | string | undefined | unknown): string {
  const priceAsNumber = Number(price);
  if (!!!priceAsNumber) return String(price);
  return priceAsNumber.toLocaleString("fa-IR");
}

export default formatFaPrice;
