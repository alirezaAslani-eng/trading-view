const FEE_PRECENT = 0.1;

const getTradeFee = (price: number) => {
  return Math.floor((price * FEE_PRECENT) / 100);
};

export { getTradeFee };
