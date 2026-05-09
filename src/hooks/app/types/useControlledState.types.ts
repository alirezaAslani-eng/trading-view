interface UseControlledStateConfig {
  onChange?: (value: string) => void;
  value?: string;
}
type UseControlledStateReturn = [string | undefined, (value: string) => void];

export type { UseControlledStateConfig, UseControlledStateReturn };
