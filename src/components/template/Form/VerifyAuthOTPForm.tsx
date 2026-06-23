"use client";
import { Box, ButtonBase, SxProps, Theme, Typography } from "@mui/material";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import InputVerifyCode from "@/components/template/Input/InputVerifyCode";
import { RestartRightIcon } from "@/components/ui/Icon";
import { useMutation } from "@tanstack/react-query";
import {
  requestAuthOTPConfig,
  verifyAuthOTPConfig,
} from "@/packages/react-query";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyAuthOTPSchema from "@/validations/auth/verifyAuthOTPSchema";
import safeAsync from "@/utils/app/safeAsync";
import { VerifyAuthOTPSchemaType } from "@/validations/types";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import {
  getStoredIdentifier,
  removeStoredIdentifier,
} from "@/utils/features/auth/userIdentifierStoreHandlers";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import AuthFormLayoutField from "../Layout/AuthFormLayout/AuthFormLayoutField";
import AuthFormLayoutLable from "../Layout/AuthFormLayout/AuthFormLayoutLable";
import AuthFormLayoutSubmit from "../Layout/AuthFormLayout/AuthFormLayoutSubmit";
import { ROUTES } from "@/constant/app/routes";

const mutationConfig = verifyAuthOTPConfig();

function VerifyAuthOTPForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(verifyAuthOTPSchema),
  });

  useEffect(() => {
    form.setValue("identifier", getStoredIdentifier());
  }, [form.setValue]);

  const mutation = useMutation({
    ...mutationConfig,
    onSuccess: () => {
      removeStoredIdentifier();
      router.replace(ROUTES.PROFILE.OVERIVIEW);
    },
    meta: {
      successMessage: "خوش اومدی! 👋",
    },
  });

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
        <NextLink href={"/auth"}>
          <Typography
            variant="body3"
            sx={{ color: notDefinedColors["#C6C6C6"] }}
          >
            {"اصلاح شماره موبایل"}
          </Typography>
        </NextLink>
        <RequestOtpButton />
      </Box>
    </>
  );
}

export default VerifyAuthOTPForm;

const requestOtpConfig = requestAuthOTPConfig();

const requestOtpButton_sx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "text.primary",
  minHeight: "20px",
};

function RequestOtpButton() {
  const mutation = useMutation({
    ...requestOtpConfig,
    meta: {
      successMessage: "کد ارسال شد",
    },
  });

  const requestOtp = async () => {
    const identifier = getStoredIdentifier();
    mutation.mutate({ identifier });
  };

  // TODO Implement remaining time logic
  return (
    <ButtonBase
      disableRipple
      disabled={mutation.isPending}
      onClick={requestOtp}
      sx={requestOtpButton_sx}
    >
      {!mutation.isPending && <RestartRightIcon sx={{ color: "inherit" }} />}

      <Typography variant="body3">
        {mutation.isPending ? "در حال ارسال" : "اصلاح شماره موبایل"}
      </Typography>

      {mutation.isPending && (
        <BouncCircleLoader
          sx={{ gap: "4px" }}
          bounceSx={{ width: "4px", backgroundColor: "text.primary" }}
        />
      )}
    </ButtonBase>
  );
}
