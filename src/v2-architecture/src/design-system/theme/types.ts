import type { Components, Theme, TypographyStyle } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";

// * ============ Palette =============
type TextVariables = Record<
  | "disabled"
  | "profit"
  | "primary"
  | "primary2"
  | "sidebarActive"
  | "onPrimary"
  | "placeHolder"
  | "linkSecondary"
  | "linkTertiary"
  | "heading"
  | "secondary"
  | "caption"
  | "error"
  | "placeholder"
  | "inputText"
  | "tertiary",
  string
>;

type BackgroundVariables = Record<
  | "primary"
  | "sidebarActive"
  | "toggleActive"
  | "input"
  | "inputModal"
  | "surface"
  | "surfaceSecondary"
  | "surfaceTertiary"
  | "sell"
  | "buy"
  | "surfaceLevel4"
  | "surfaceLevel5",
  string
>;

type BorderVariables = Record<
  "white" | "primary" | "secondary" | "error" | "default" | "dark",
  string
>;

type StatusVariables = Record<"profit" | "loss" | "warning", string>;

interface CustomPalette {
  text: TextVariables;
  background: BackgroundVariables;
  border: BorderVariables;
  status: StatusVariables;
}

// * ============ Typography =============
interface CustomTypographyVariants extends Record<
  | "body3"
  | "button1"
  | "button2"
  | "button3"
  | "button4"
  | "caption1"
  | "caption2"
  | "h7"
  | "button5"
  | "body4",
  TypographyStyle
> {}

// * ============ Utils =============
type PartialPalette<Palette extends CustomPalette> = {
  [key in keyof Palette]?: Partial<Palette[key]>;
};

type MuiOverriderType<TComponent extends keyof Components<Theme>> =
  Components<Theme>[TComponent];

type SxPropOnlyObject = SystemStyleObject<Theme>;

type ReplaceSxWithSxOnlyObject<T> = Omit<T, "sx"> & { sx?: SxPropOnlyObject };

export type {
  CustomPalette,
  TextVariables,
  StatusVariables,
  BorderVariables,
  BackgroundVariables,
  CustomTypographyVariants,
  PartialPalette,
  MuiOverriderType,
  SxPropOnlyObject,
  ReplaceSxWithSxOnlyObject,
};
