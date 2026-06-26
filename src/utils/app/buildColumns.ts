import { Column } from "@/components/ui/Table/DataTable";

interface BuildColumnsOptions<
  Row,
  Defs extends Partial<Record<keyof Row, Column<Row>>>,
> {
  /** Which columns to include, and in what order. Defaults to all keys, in def order. */
  include?: (keyof Defs)[];
  /** Partial overrides merged onto the base column definition, keyed by column key. */
  overrides?: Partial<Record<keyof Defs, Partial<Column<Row>>>>;
  /** Extra columns appended after the included ones (e.g. row actions). */
  extra?: Column<Row>[];
}

type DefColumns<Row extends object> = Partial<Record<keyof Row, Column<Row>>>;

/**
 * Generic column-builder for any table's column-def map.
 * Lets callers pick a subset of columns, override individual columns,
 * and append extra columns — without touching the original defs.
 */
function buildColumns<
  Row extends object,
  Defs extends DefColumns<Row> = DefColumns<Row>,
>(
  defs: Defs,
  {
    include = Object.keys(defs) as (keyof Defs)[],
    overrides,
    extra,
  }: BuildColumnsOptions<Row, Defs> = {},
): Column<Row>[] {
  const columns = include.map((key) => ({
    ...defs[key],
    ...overrides?.[key],
  }));

  return extra ? [...columns, ...extra] : columns;
}

export type { BuildColumnsOptions, DefColumns };
export { buildColumns };
