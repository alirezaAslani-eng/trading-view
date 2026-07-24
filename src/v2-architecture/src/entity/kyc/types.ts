//#region // * ------------ KYC LEVEL ------------
export type KycLevel =
  | "None"
  | "Level1_Basic"
  | "Level2_Advanced"
  | "Level3_Business";

export type KycLevelKeys =
  | "None"
  | CreateLevel<1>
  | CreateLevel<2>
  | CreateLevel<3>;
type CreateLevel<TLevel extends number> = `LEVEL_${TLevel}`;
//#endregion // * ------------ KYC LEVEL ------------
