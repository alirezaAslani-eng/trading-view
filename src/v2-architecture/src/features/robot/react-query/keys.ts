export const tradeRobotsKey = ["trading-robots" as const];
export const botSettingKey = ["but-setting"];
export const botSettingDynamicKey = (id: string) => [...botSettingKey, id];
