"use client";
import { Box, ButtonBase, Typography } from "@mui/material";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import InputVerifyCode from "@/components/template/Input/InputVerifyCode";
import SendAuthOTP from "@/components/template/Button/SendAuthOTP";
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
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import {
  getStoredIdentifier,
  removeStoredIdentifier,
} from "@/utils/features/auth/userIdentifierStoreHandlers";

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
      router.replace("/panel/profile/my-info");
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
      <FormLayout onSubmit={form.handleSubmit(submiter)}>
        <FormLayoutField>
          <FormLayoutLable>{"کد تایید"}</FormLayoutLable>
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
        </FormLayoutField>

        <FormLayoutSubmit disabled={form.formState.isSubmitting}>
          {"تایید و ادامه"}
        </FormLayoutSubmit>
      </FormLayout>
      <Box
        sx={{
          width: "100%",
          mt: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NextLink href={""}>
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
function RequestOtpButton() {
  const mutation = useMutation(requestOtpConfig);

  const requestOtp = async () => {
    const identifier = getStoredIdentifier();
  };
  return (
    <ButtonBase
      disableRipple
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "text.primary",
      }}
    >
      <RestartRightIcon sx={{ color: "inherit" }} />
      <Typography variant="body3">{"اصلاح شماره موبایل"}</Typography>
    </ButtonBase>
  );
}
