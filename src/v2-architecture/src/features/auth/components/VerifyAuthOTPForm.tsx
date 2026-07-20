import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuthFlow } from "../context";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { verifyAuthOTPConfig } from "../react-query";
import { ROUTES } from "@/v2-architecture/src/shared/routes";
import { verifyAuthOTPSchema, VerifyAuthOTPSchemaType } from "../validations";
import { notifyLoading } from "@/v2-architecture/src/shared/lib/react-hot-toast";
import { notifications } from "@/v2-architecture/src/shared/constants";
import { Box, ButtonBase, SxProps, Theme, Typography } from "@mui/material";
import { legacyColors } from "@/v2-architecture/src/design-system";
import { useRequestAuthOTP } from "../hooks";
import { useCountdown } from "@/v2-architecture/src/shared/hooks";
import { RequestAuthOTPData } from "../api";
import { ResponseError } from "@/v2-architecture/src/api";
import {
  AuthFormLayout,
  AuthFormLayoutContainer,
  AuthFormLayoutField,
  AuthFormLayoutHeading,
  AuthFormLayoutLable,
  AuthFormLayoutSubmit,
} from "./AuthFormLayout";
import {
  formatMsDuration,
  safeAsync,
} from "@/v2-architecture/src/shared/utils";
import {
  BounceCircleLoader,
  InputVerifyCode,
  RestartRightIcon,
} from "@/v2-architecture/src/shared/ui";

function VerifyAuthOTPForm() {
  const router = useRouter();

  const authFlow = useAuthFlow()!;

  const form = useForm({
    resolver: zodResolver(verifyAuthOTPSchema),
    defaultValues: {
      identifier: authFlow.identifier,
    },
  });

  const mutation = useMutation(
    verifyAuthOTPConfig({
      onSuccess: () => router.replace(ROUTES.PANEL.ROOT),
    })
  );

  const submiter: SubmitHandler<VerifyAuthOTPSchemaType> = async (fields) => {
    await notifyLoading(
      safeAsync(async () => {
        await mutation.mutateAsync({ body: fields });
      }),
      { loading: notifications.loading }
    );
  };

  return (
    <>
      <AuthFormLayout>
        <AuthFormLayoutHeading
          title="کد تایید"
          subTitle="جهت تایید شماره موبایل، کد ارسال شده را وارد کنید"
        />
        <AuthFormLayoutContainer>
          <Box component={"form"} onSubmit={form.handleSubmit(submiter)}>
            <AuthFormLayoutField>
              <AuthFormLayoutLable>{"کد تایید"}</AuthFormLayoutLable>
              <Controller
                control={form.control}
                name="code"
                render={({ field, fieldState }) => {
                  console.log(fieldState.invalid);

                  return (
                    <InputVerifyCode
                      onComplete={field.onChange}
                      error={fieldState.invalid}
                    />
                  );
                }}
              />
            </AuthFormLayoutField>

            <AuthFormLayoutSubmit disabled={form.formState.isSubmitting}>
              {"تایید و ادامه"}
            </AuthFormLayoutSubmit>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component={"button"}
              onClick={authFlow.goBackToEnterInfo}
              variant="body3"
              sx={{ color: legacyColors["#C6C6C6"], cursor: "pointer" }}
            >
              ویرایش {authFlow.identifier}
            </Typography>

            <RequestOtpButton />
          </Box>
        </AuthFormLayoutContainer>
      </AuthFormLayout>
    </>
  );
}

export default VerifyAuthOTPForm;

const requestOtpButton_sx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "text.primary",
  minHeight: "20px",
};

function RequestOtpButton() {
  const authFlow = useAuthFlow()!;

  const mutation = useRequestAuthOTP(authFlow.identifier);

  const countDown = useCountdown(
    normalizeOtpExpIn(mutation.data, mutation.error)
  );

  const requestOtp = async () => {
    mutation.mutate({ identifier: authFlow.identifier });
  };

  return (
    <>
      {!countDown.isFinished && (
        <Typography variant="body3" sx={{ color: "text.onPrimary" }}>
          {formatMsDuration(countDown.remainingMs)}{" "}
        </Typography>
      )}
      {countDown.isFinished && (
        <ButtonBase
          disableRipple
          disabled={mutation.isPending}
          onClick={requestOtp}
          sx={requestOtpButton_sx}
        >
          {!mutation.isPending && (
            <RestartRightIcon sx={{ color: "inherit" }} />
          )}

          <Typography variant="body3">
            {mutation.isPending ? "در حال ارسال" : "درخواست مجدد"}
          </Typography>

          {mutation.isPending && (
            <BounceCircleLoader
              sx={{ gap: "4px" }}
              bounceSx={{ width: "4px", backgroundColor: "text.primary" }}
            />
          )}
        </ButtonBase>
      )}
    </>
  );
}

// * helper function
function normalizeOtpExpIn(
  data: RequestAuthOTPData | undefined,
  error: ResponseError | null
): number {
  const duration =
    (data?.expIn ??
      (error?.details as RequestAuthOTPData | undefined)?.expIn) ||
    0;

  return duration;
}
