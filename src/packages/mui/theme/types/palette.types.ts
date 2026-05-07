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
  | "inputText",
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

export type {
  CustomPalette,
  TextVariables,
  StatusVariables,
  BorderVariables,
  BackgroundVariables,
};
