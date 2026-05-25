import { kycL2, requestAuthOTP, verifyAuthOTP } from "@/api";
import { mutationOptions } from "@tanstack/react-query";
import {
  kycLevel1Key,
  kycLevel2Key,
  requestAuthOTPKey,
  verifyAuthOTPKey,
} from "@/packages/react-query/keys/mutationKeys";
import { ResponseErrorType } from "@/types";
import {
  KycL1SchemaType,
  KycL2SchemaType,
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";
import { KycL2Response, VerifyAuthOTPResponse } from "@/api/types";
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

const kycLevel2Config = () => {
  return mutationOptions<KycL2Response, ResponseErrorType, KycL2SchemaType>({
    mutationKey: kycLevel2Key,
    mutationFn: kycL2,
  });
};

export {
  requestAuthOTPConfig,
  verifyAuthOTPConfig,
  kycLevel1Config,
  kycLevel2Config,
};
