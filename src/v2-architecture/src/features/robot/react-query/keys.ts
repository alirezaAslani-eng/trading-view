export const botSettingKey = ["but-setting"];
export const botSettingDynamicKey = (symbol: string) => [
  ...botSettingKey,
  symbol,
];
