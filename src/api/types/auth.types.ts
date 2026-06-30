// *‌ ------start----- verifyAuthOTP.ts ---------
interface VerifyAuthOTPResponse {
  message: string;
  token: string;
}
// *‌ ------end----- verifyAuthOTP.ts ---------
// *‌ ------start----- refreshAuthToken.ts ---------
interface RefreshAuthTokenResponse {
  message: string;
  token: string;
}
// *‌ ------end----- refreshAuthToken.ts ---------

export type { VerifyAuthOTPResponse, RefreshAuthTokenResponse };
