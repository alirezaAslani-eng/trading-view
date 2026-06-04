import { deleteBankAccount, kycL2, requestAuthOTP, verifyAuthOTP } from "@/api";
import { mutationOptions } from "@tanstack/react-query";
import {
  addCardKey,
  addShabaKey,
  kycLevel1Key,
  kycLevel2Key,
  requestAuthOTPKey,
  verifyAuthOTPKey,
} from "@/packages/react-query/keys/mutationKeys";
import { BaseApiResponse, KycLevel, ResponseErrorType } from "@/types";
import {
  AddCardSchemaType,
  AddShabaSchemaType,
  KycL1SchemaType,
  KycL2SchemaType,
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";
import { KycL2Response, VerifyAuthOTPResponse } from "@/api/types";
import { kycL1 } from "@/api";
import addCard from "@/api/bank/addcard";
import addShaba from "@/api/bank/addShaba";
import queryClient from "../core/queryClient";
import { banksKey } from "../keys/queryKeys";

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

const addCardConfig = () => {
  return mutationOptions<
    BaseApiResponse<KycLevel>,
    ResponseErrorType,
    AddCardSchemaType
  >({
    mutationKey: addCardKey,
    mutationFn: addCard,
  });
};

const addShabaConfig = () => {
  return mutationOptions<
    BaseApiResponse<KycLevel>,
    ResponseErrorType,
    AddShabaSchemaType
  >({
    mutationKey: addShabaKey,
    mutationFn: addShaba,
  });
};
const deleteBankConfig = () => {
  return mutationOptions<void, ResponseErrorType, number>({
    mutationFn: deleteBankAccount,
    onSuccess: () => {
      // TODO optimisic update is required
      queryClient.invalidateQueries({
        queryKey: banksKey,
        refetchType: "active",
      });
    },
  });
};

export {
  requestAuthOTPConfig,
  verifyAuthOTPConfig,
  kycLevel1Config,
  kycLevel2Config,
  addCardConfig,
  addShabaConfig,
  deleteBankConfig,
};
