import { Infer, input, number, object, output } from "zod";

export const setDemoSettingSchema = object({
  initialIrtAmount: number().positive(" "),
  initialAssetAmount: number(" "),
  validityDays: number().positive(" "),
});

export type SetDemoSettingSchemaInput = input<typeof setDemoSettingSchema>;
export type SetDemoSettingSchemaOutput = output<typeof setDemoSettingSchema>;
export type SetDemoSettingSchema = Infer<typeof setDemoSettingSchema>;
