import { ReactNode } from "react";

type ParamsType<
  TFunction extends Function,
  ParamIndex extends number | `${number}` = 0,
> = TFunction extends (...params: infer P) => any
  ? //@ts-ignore
    P[ParamIndex]
  : any;

/**
 * PWC = PropsWithChildren
 */
type PWC<T extends object = object, TChildren = ReactNode> = T & {
  children: TChildren;
};

/**
 * add the `id` property to your interface
 */
type WithID<T extends object = object> = T & { id: string };
export type { ParamsType, PWC, WithID };
