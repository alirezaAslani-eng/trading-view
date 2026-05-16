import { requestAuthOTP } from "@/api";
import { mutationOptions } from "@tanstack/react-query";
import { requestAuthOTPKey } from "@/packages/react-query/keys/mutationKeys";

const requestAuthOTPConfig = () => {
  return mutationOptions({
    mutationKey: requestAuthOTPKey,
    mutationFn: requestAuthOTP,
  });
};

export { requestAuthOTPConfig };
