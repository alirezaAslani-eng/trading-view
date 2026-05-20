interface GetTomanUnitPriceReturn {
  isOnes: boolean;
  isThousand: boolean;
  isMillion: boolean;
  isBillion: boolean;
}
const getTomanUnitPrice = (price: number): GetTomanUnitPriceReturn => {
  return {
    isOnes: price >= 100 && price < 1000,
    isThousand: price >= 1000 && price < 1000_000,
    isMillion: price >= 1000_000 && price < 1000_000_000,
    isBillion: price >= 1000_000_000 && price < 1000_000_000_000,
  };
};

export default getTomanUnitPrice;
