import { ResponseError } from "@/v2-architecture/src/api";

export function isKycMergeAccountError(err: ResponseError) {
  return err?.code === "Kyc.RequireMerge";
}
