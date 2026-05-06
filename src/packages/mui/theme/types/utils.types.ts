import { CustomPalette } from ".";

type PartialPalette<Palette extends CustomPalette> = {
  [key in keyof Palette]?: Partial<Palette[key]>;
};

export type { PartialPalette };
