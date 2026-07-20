interface UseControlledStateConfig<TValue> {
  onChange?: (value: TValue) => void;
  value?: TValue;
  defaultState?: TValue;
}
type UseControlledStateReturn<TValue> = [
  TValue | undefined,
  (value: TValue) => void,
];

export type { UseControlledStateConfig, UseControlledStateReturn };
