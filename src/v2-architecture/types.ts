import { Dayjs } from "dayjs";
import { NextRequest } from "next/server";

//#region // * ------------ state types ------------
export type PaginationFilter<T = unknown> = T & {
  page: number;
  pageSize: number;
};
export type DateFilter<T = unknown> = T & {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
};
//#endregion // * ------------ state types ------------

//#region // * ------------ Route Handler types ------------
export type RouteHandler<TParams extends string | string[] = string> = (
  req: NextRequest,
  context: { params: Promise<Record<string, TParams>> }
) => Promise<Response>;
//#endregion // * ------------ Route Handler types ------------

//#region // * ------------ Data types ------------
export type WithID<T extends object = object> = T & { id: string };
//#endregion // * ------------ Data types ------------
