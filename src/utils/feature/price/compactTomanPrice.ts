import getTomanUnitPrice from "./getTomanUnitPrice";

function compactTomanPrice(price: number): { compacted: number; unit: string } {
  const absPrice = Math.abs(price);

  const tomanUnits = getTomanUnitPrice(absPrice);

  if (tomanUnits.isOnes) {
    return { compacted: absPrice, unit: "" };
  }
  if (tomanUnits.isThousand) {
    return { compacted: Math.floor(absPrice / 1000), unit: "هزار" };
  }
  if (tomanUnits.isMillion) {
    return { compacted: Math.floor(absPrice / 1000_000), unit: "میلیون" };
  }
  if (tomanUnits.isBillion) {
    return { compacted: Math.floor(absPrice / 1000_000_000), unit: "میلیارد" };
  }
  return { compacted: 0, unit: "" };
}

export default compactTomanPrice;
