import { requestAuthOTP, verifyAuthOTP } from "@/api";
import { mutationOptions } from "@tanstack/react-query";
import {
  requestAuthOTPKey,
  verifyAuthOTPKey,
} from "@/packages/react-query/keys/mutationKeys";
import { ResponseErrorType } from "@/types";
import {
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";
import { VerifyAuthOTPResponse } from "@/api/types";

const requestAuthOTPConfig = () => {
  return mutationOptions<void, ResponseErrorType, RequestAuthOTPSchemaType>({
    mutationKey: requestAuthOTPKey,
    mutationFn: requestAuthOTP,
  });
};
const verifytAuthOTPConfig = () => {
  return mutationOptions<
    VerifyAuthOTPResponse,
    ResponseErrorType,
    VerifyAuthOTPSchemaType
  >({
    mutationKey: verifyAuthOTPKey,
    mutationFn: verifyAuthOTP,
  });
};

export { requestAuthOTPConfig, verifytAuthOTPConfig };
