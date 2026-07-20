type Units = "IRT";

interface UnitType {
  displayName: string;
}

const PRICE_UNITS: Record<Units, UnitType> = {
  IRT: {
    displayName: "ریال",
  },
} as const;

export { PRICE_UNITS };
