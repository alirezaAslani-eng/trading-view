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

// *‌ ------start----- requestAuthOTP.ts ---------
interface RequestAuthOTPResponse {
  expIn: number;
}
// *‌ ------end----- requestAuthOTP.ts ---------

export type {
  VerifyAuthOTPResponse,
  RefreshAuthTokenResponse,
  RequestAuthOTPResponse,
};
