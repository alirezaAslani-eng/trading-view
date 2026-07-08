type WeightUnits = "kg";

interface WeightUnit {
  unit: WeightUnits;
  lable: string;
}

const WEIGHT_UNITS = {
  KG: {
    unit: "kg",
    lable: "کیلو",
  } satisfies WeightUnit,
} as const;

const WEIGHT_UNIT_LIST: WeightUnit[] = [
  {
    lable: "کیلو",
    unit: "kg",
  },
];

export { WEIGHT_UNIT_LIST, WEIGHT_UNITS };
