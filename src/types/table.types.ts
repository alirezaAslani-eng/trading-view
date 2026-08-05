type BaseColumn<TRow> = {
  headerName: string;
  key: keyof TRow;
  content: (row: TRow) => string | number;
};
export type CreateBaseColumns<TRow extends object> = Partial<
  Record<keyof TRow, BaseColumn<TRow>>
>;
