import { requestAuthOTP, verifyAuthOTP } from "@/api";
import { mutationOptions } from "@tanstack/react-query";
import {
  kycLevel1Key,
  requestAuthOTPKey,
  verifyAuthOTPKey,
} from "@/packages/react-query/keys/mutationKeys";
import { ResponseErrorType } from "@/types";
import {
  KycL1SchemaType,
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";
import { VerifyAuthOTPResponse } from "@/api/types";
import { kycL1 } from "@/api";

const requestAuthOTPConfig = () => {
  return mutationOptions<void, ResponseErrorType, RequestAuthOTPSchemaType>({
    mutationKey: requestAuthOTPKey,
    mutationFn: requestAuthOTP,
  });
};
const verifyAuthOTPConfig = () => {
  return mutationOptions<
    VerifyAuthOTPResponse,
    ResponseErrorType,
    VerifyAuthOTPSchemaType
  >({
    mutationKey: verifyAuthOTPKey,
    mutationFn: verifyAuthOTP,
  });
};
const kycLevel1Config = () => {
  return mutationOptions<void, ResponseErrorType, KycL1SchemaType>({
    mutationKey: kycLevel1Key,
    mutationFn: kycL1,
  });
};

export { requestAuthOTPConfig, verifyAuthOTPConfig, kycLevel1Config };
