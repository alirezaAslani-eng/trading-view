//#region // * ------------ queries ------------
export const portfolioTrendtKey = ["portfolio-trend"];
export const portfolioTrendtDynamicKey = (isdemo: boolean) => [
  ...portfolioTrendtKey,
  isdemo,
];
//#endregion // * ------------ queries ------------
