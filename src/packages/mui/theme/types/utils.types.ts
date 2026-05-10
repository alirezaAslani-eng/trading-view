import type { Components, Theme } from "@mui/material";
import { CustomPalette } from ".";
type PartialPalette<Palette extends CustomPalette> = {
  [key in keyof Palette]?: Partial<Palette[key]>;
};

type MuiOverriderType<TComponent extends keyof Components<Theme>> =
  Components<Theme>[TComponent];

export type { PartialPalette, MuiOverriderType };
