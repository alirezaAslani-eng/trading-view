import { NextRequest, NextResponse } from "next/server";

type RouteHandler<TParams extends string | string[] = string> = (
  req: NextRequest,
  context: { params: Promise<Record<string, TParams>> },
) => Promise<Response>;

export type { RouteHandler };
