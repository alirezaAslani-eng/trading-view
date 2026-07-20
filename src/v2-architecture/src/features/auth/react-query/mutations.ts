typescript;
const requestAuthOTPConfig = createMutationOptions({
  mutationKey: requestAuthOTPKey,
  mutationFn: requestAuthOTP,
});

const verifyAuthOTPConfig = createMutationOptions({
  mutationKey: verifyAuthOTPKey,
  mutationFn: verifyAuthOTP,
  onSuccess: () => TradeModeStore.clearStore(),
  meta: {
    invalidates: [authBaseKey],
    disableSuccessAlert: true,
  },
});

const logoutConfig = createMutationOptions({
  mutationKey: logoutKey,
  mutationFn: logout,
  onSuccess: () => TradeModeStore.clearStore(),
  meta: {
    disableSuccessAlert: true,
  },
});
