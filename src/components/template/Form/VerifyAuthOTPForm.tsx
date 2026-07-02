"use client";
import { Box, ButtonBase, SxProps, Theme, Typography } from "@mui/material";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import InputVerifyCode from "@/components/template/Input/InputVerifyCode";
import { RestartRightIcon } from "@/components/ui/Icon";
import { useMutation } from "@tanstack/react-query";
import { verifyAuthOTPConfig } from "@/packages/react-query";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyAuthOTPSchema from "@/validations/auth/verifyAuthOTPSchema";
import safeAsync from "@/utils/app/safeAsync";
import { VerifyAuthOTPSchemaType } from "@/validations/types";
import { useRouter } from "next/navigation";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import AuthFormLayoutField from "../Layout/AuthFormLayout/AuthFormLayoutField";
import AuthFormLayoutLable from "../Layout/AuthFormLayout/AuthFormLayoutLable";
import AuthFormLayoutSubmit from "../Layout/AuthFormLayout/AuthFormLayoutSubmit";
import { ROUTES } from "@/constant/app/routes";
import { useAuthFlow } from "@/context/feature/auth/AuthFlow/AuthFlowContext";
import AuthFormLayout from "../Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "../Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutContainer from "../Layout/AuthFormLayout/AuthFormLayoutContainer";
import useCountdown from "@/hooks/app/useCountdown";
import formatDuration from "@/utils/app/formatMsDuration";
import { normalizeOtpExpIn } from "@/utils";
import useRequestAuthOTP from "@/hooks/features/auth/useRequestAuthOTP";

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
      onSuccess: () => router.replace(ROUTES.PROFILE.OVERIVIEW),
      meta: {
        successMessage: "خوش اومدی! 👋",
      },
    }),
  );

  const submiter: SubmitHandler<VerifyAuthOTPSchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await mutation.mutateAsync(fields);
      }),
      { loading: alertMessages.loading },
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
              sx={{ color: notDefinedColors["#C6C6C6"], cursor: "pointer" }}
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
    normalizeOtpExpIn(mutation.data, mutation.error),
  );

  const requestOtp = async () => {
    mutation.mutate({ identifier: authFlow.identifier });
  };

  return (
    <>
      {!countDown.isFinished && (
        <Typography variant="body3" sx={{ color: "text.onPrimary" }}>
          {formatDuration(countDown.remainingMs)}{" "}
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
            <BouncCircleLoader
              sx={{ gap: "4px" }}
              bounceSx={{ width: "4px", backgroundColor: "text.primary" }}
            />
          )}
        </ButtonBase>
      )}
    </>
  );
}
