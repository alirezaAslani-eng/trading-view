function formatFaPrice(price: number): string {
  const priceAsNumber = Number(price);
  if (!!!priceAsNumber) return String(price);
  return priceAsNumber.toLocaleString("fa-IR").replace(/٬/g, ".");
}

export default formatFaPrice;
