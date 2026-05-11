import type { Components, Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";
import { CustomPalette } from ".";
type PartialPalette<Palette extends CustomPalette> = {
  [key in keyof Palette]?: Partial<Palette[key]>;
};

type MuiOverriderType<TComponent extends keyof Components<Theme>> =
  Components<Theme>[TComponent];

type SxPropOnlyObject = SystemStyleObject<Theme>;

type ReplaceSxWithSxOnlyObject<T> = Omit<T, "sx"> & { sx?: SxPropOnlyObject };
export type {
  PartialPalette,
  MuiOverriderType,
  SxPropOnlyObject,
  ReplaceSxWithSxOnlyObject,
};
