"use client";
import { Box, Typography } from "@mui/material";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import InputVerifyCode from "@/components/template/Input/InputVerifyCode";
import SendAuthOTP from "@/components/template/Button/SendAuthOTP";
import { RestartRightIcon } from "@/components/ui/Icon";
import { useMutation } from "@tanstack/react-query";
import { verifyAuthOTPConfig } from "@/packages/react-query";
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
import { identifierSessionKey } from "@/constant/features/auth/sessionStorageKeys";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { promiseAlert } from "@/packages/react-hot-toast";

const mutationConfig = verifyAuthOTPConfig();

function VerifyAuthOTPForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(verifyAuthOTPSchema),
  });

  useEffect(() => {
    form.setValue(
      "identifier",
      sessionStorage.getItem(identifierSessionKey) ?? "",
    );
  }, [form.setValue, identifierSessionKey]);

  const mutation = useMutation({
    ...mutationConfig,
    onSuccess: () => {
      sessionStorage.removeItem(identifierSessionKey);
      router.replace("/panel/profile/my-info");
    },
    meta:{
      successMessage:"خوش اومدی! 👋"
    }
  });

  const submiter: SubmitHandler<VerifyAuthOTPSchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await mutation.mutateAsync(fields);
      }),
      { loading: "صبر کنید" },
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

        <SendAuthOTP>
          <RestartRightIcon sx={{ color: "inherit" }} />
          {"اصلاح شماره موبایل"}
        </SendAuthOTP>
      </Box>
    </>
  );
}

export default VerifyAuthOTPForm;
