import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { logout, requestAuthOTP, verifyAuthOTP } from "../api";
import {
  authBaseKey,
  logoutKey,
  requestAuthOTPKey,
  verifyAuthOTPKey,
} from "./keys";

export const requestAuthOTPConfig = createMutationOptions({
  mutationKey: requestAuthOTPKey,
  mutationFn: requestAuthOTP,
});

export const verifyAuthOTPConfig = createMutationOptions({
  mutationKey: verifyAuthOTPKey,
  mutationFn: verifyAuthOTP,
  // ! FTD
  // onSuccess: () => TradeModeStore.clearStore(),
  meta: {
    invalidates: [authBaseKey],
    disableSuccessAlert: true,
  },
});

export const logoutConfig = createMutationOptions({
  mutationKey: logoutKey,
  mutationFn: logout,
  // ! FTD
  // onSuccess: () => TradeModeStore.clearStore(),
  meta: {
    disableSuccessAlert: true,
  },
});
