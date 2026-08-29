//#region // * ------------ queries ------------
export const portfolioTrendtKey = ["portfolio-trend"];
export const marginSettingsKey = ["margin-setting"];
export const portfolioTrendtDynamicKey = (isdemo: boolean) => [
  ...portfolioTrendtKey,
  isdemo,
];
//#endregion // * ------------ queries ------------
