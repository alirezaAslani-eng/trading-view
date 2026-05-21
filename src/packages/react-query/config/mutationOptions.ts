import { requestAuthOTP } from "@/api";
import { mutationOptions } from "@tanstack/react-query";
import { requestAuthOTPKey } from "@/packages/react-query/keys/mutationKeys";
import { ResponseErrorType } from "@/types";
import {
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";

const requestAuthOTPConfig = () => {
  return mutationOptions<void, ResponseErrorType, RequestAuthOTPSchemaType>({
    mutationKey: requestAuthOTPKey,
    mutationFn: requestAuthOTP,
  });
};
    mutationKey: requestAuthOTPKey,
    mutationFn: requestAuthOTP,
  });
};

export { requestAuthOTPConfig };
