import { ResponseError } from "@/api";
import { notifyError, notifySuccess } from "@/lib/react-hot-toast";
import queryClient from "./queryClient";
import { Mutation } from "@tanstack/react-query";

type MutationType = Mutation<unknown, unknown, unknown, unknown>;

export function mutationErrorHandler(
  data: ResponseError,
  mutation: MutationType
) {
  const custom_message = mutation?.meta?.errorMessage;
  const server_message = !!data.message ? data.message : "اعملیات ناموفق";
  const message = custom_message ?? server_message;
  notifyError(message);
}

export function mutationSuccessHandler(mutation: MutationType) {
  const message = mutation?.meta?.successMessage ?? "عملیات با موفقیت انجام شد";
  if (!!mutation?.meta?.disableSuccessAlert) return;
  notifySuccess(message);
}

let authExpiredHandled = false;
export function expiredAuthErrorHandler(err: ResponseError) {
  if (authExpiredHandled) return;
  if (err?.status !== 401) return;
  authExpiredHandled = true;
  dispatch(openAuthModal());
}
export function invalidatesHandler(mutation: MutationType) {
  const invalidates = mutation?.meta?.invalidates;
  if (!invalidates || !!!invalidates.length) return;

  invalidates.forEach((queryKey) =>
    queryClient.invalidateQueries({
      queryKey,
      refetchType: "active",
    })
  );
}
