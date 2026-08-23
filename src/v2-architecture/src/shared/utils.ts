export const booleanToNumber = (value: boolean): 0 | 1 => (value ? 1 : 0);

//#region // * ------------ Wrapped (new Audio) API ------------
export function createAudio(src: string): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  return new Audio(src);
}
//#endregion // * ------------ Wrapped (new Audio) API ------------
