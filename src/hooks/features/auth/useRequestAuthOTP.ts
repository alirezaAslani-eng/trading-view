import { requestAuthOTPConfig } from "@/packages/react-query";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

function useRequestAuthOTP(identifier: string) {
  const mutation = useMutation({
    ...requestAuthOTPConfig(),
    meta: {
      successMessage: "کد ارسال شد",
    },
  });

  useEffect(() => {
    mutation.mutate({ identifier });
  }, [identifier]);

  return mutation;
}

export default useRequestAuthOTP;
