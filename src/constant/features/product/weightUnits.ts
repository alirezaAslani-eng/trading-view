type WeightUnits = "kg";

interface WeightUnit {
  unit: WeightUnits;
  lable: string;
}

const WEIGHT_INIT_LIST: WeightUnit[] = [
  {
    lable: "کیلو",
    unit: "kg",
  },
];

export { WEIGHT_INIT_LIST };
