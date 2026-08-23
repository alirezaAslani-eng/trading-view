"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import requestAuthOTPSchema from "@/validations/auth/requestAuthOTPSchema";
import {
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";
import { authContent } from "@/content/auth";
import { Box, Dialog, FormControl, Typography } from "@mui/material";
import {
  AUTH_FLOW_STEPS,
  AUTH_METHODS,
  useAuthFlow,
  getAuthHeadingContent,
} from "@/context/feature/auth/AuthFlow/AuthFlowContext";
import AuthFormLayout from "../Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "../Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutContainer from "../Layout/AuthFormLayout/AuthFormLayoutContainer";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutCheckboxGroup,
  FormLayoutField,
  FormLayoutFieldError,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import useRequestAuthOTP from "@/hooks/features/auth/useRequestAuthOTP";
import useCountdown from "@/hooks/app/useCountdown";
import { normalizeOtpExpIn } from "@/utils";
import formatDuration from "@/utils/app/formatMsDuration";
import { RestartRightIcon } from "@/components/ui/Icon";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyAuthOTPConfig } from "@/packages/react-query";
import { ROUTES } from "@/constant/app/routes";
import safeAsync from "@/utils/app/safeAsync";
import verifyAuthOTPSchema from "@/validations/auth/verifyAuthOTPSchema";
import { SigninVariables } from "@/v2-architecture/src/features/auth/api";
import { signinSchema } from "@/validations/auth/signinSchema";
import InputText from "@/components/ui/Input/InputText";
import { signinConfig } from "@/v2-architecture/src/features/auth/react-query";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import InputPassword from "@/components/ui/Input/InputPassword";
import { CreatePasswordModal } from "@/v2-architecture/src/features/user";

export function AuthForm() {
  const authFlow = useAuthFlow()!;
  const heading = getAuthHeadingContent(authFlow.step, authFlow.authMethod);

  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title={heading.title}
        subTitle={heading.subTitle}
      />

      <AuthFormLayoutContainer>
        {authFlow.step === AUTH_FLOW_STEPS.ENTER_INFO && <PhoneStep />}

        {authFlow.step === AUTH_FLOW_STEPS.VERIFY_INFO &&
          (authFlow.authMethod === AUTH_METHODS.OTP ? (
            <FinalStepWithOTP />
          ) : (
            <FinalStepWithPassword />
          ))}
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

//#region // * ------------ Auth Forms ------------
function PhoneStep() {
  const phoneLabelID = useId();

  const authFlow = useAuthFlow()!;

  const form = useForm({
    resolver: zodResolver(requestAuthOTPSchema),
    defaultValues: {
      identifier: authFlow.identifier,
    },
  });

  const onSubmitHandler = (fields: RequestAuthOTPSchemaType) => {
    authFlow.submitIdentifier(fields.identifier);
  };

  const onAuthMethodChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    authFlow.setAuthMethod(
      event.target.checked ? AUTH_METHODS.PASSWORD : AUTH_METHODS.OTP,
    );
  };

  const isPasswordMethod = authFlow.authMethod === AUTH_METHODS.PASSWORD;
  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmitHandler)}>
      {isPasswordMethod && (
        <FormLayoutAlert>
          {
            "برای ورود با رمز، ابتدا باید از طریق کد یکبار مصرف ثبت‌نام کرده و رمز عبور خود را تنظیم کرده باشید."
          }
        </FormLayoutAlert>
      )}
      <FormLayoutField>
        <FormLayoutLable>
          {authContent.requestOtpContent.phoneInputLable}
        </FormLayoutLable>
        <InputPhoneNumber
          id={phoneLabelID}
          {...form.register("identifier")}
          error={!!form.formState.errors.identifier?.message}
        />
      </FormLayoutField>

      <FormLayoutCheckboxGroup>
        <CheckBox
          label="ورود با رمز"
          checked={authFlow.authMethod === AUTH_METHODS.PASSWORD}
          onChange={onAuthMethodChangeHandler}
        />
      </FormLayoutCheckboxGroup>

      <FormLayoutSubmit>
        {isPasswordMethod ? "ورود با رمز" : "دریافت رمز یکبار مصرف"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

function FinalStepWithOTP() {
  const authFlow = useAuthFlow()!;
  const routes = useRouter();
  //#region // * ------------ Password Modal State ------------
  const [passwordModal, setPasswordModal] = useState(false);

  const closePasswordModalHandler = () => {
    routes.replace(ROUTES.PANEL.ROOT);
    setPasswordModal(false);
  };
  const openPasswordModalHandler = () => {
    setPasswordModal(true);
  };
  //#endregion // * ------------ Password Modal State ------------

  const form = useForm({
    resolver: zodResolver(verifyAuthOTPSchema),
    defaultValues: {
      identifier: authFlow.identifier,
    },
  });

  //#region // * ------------ Form API ------------
  const mutation = useMutation(
    verifyAuthOTPConfig({
      onSuccess: (data) => {
        if (data.hasPassword) {
          routes.replace(ROUTES.PANEL.ROOT);
          return;
        }
        openPasswordModalHandler();
      },
    }),
  );

  const submitHandler = async (fields: VerifyAuthOTPSchemaType) => {
    await safeAsync(() => mutation.mutateAsync(fields));
  };
  //#endregion // * ------------ Form API ------------

  return (
    <Box>
      <FormControl disabled={form.formState.isSubmitting}>
        <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
          <FormLayoutField>
            <FormLayoutLable>{"کد تایید"}</FormLayoutLable>
            <InputText
              {...form.register("code")}
              size="large"
              placeholder="کد تایید ۶ رقمی را وارد کنید"
              sx={{ textAlign: "center" }}
              error={!!form.formState.errors.code?.message}
            />
          </FormLayoutField>

          <FormLayoutSubmit>{"تایید و ادامه"}</FormLayoutSubmit>
        </FormLayout>
      </FormControl>
      <VerifyAuthOTPFooter />

      {/* // * Create Password Modal */}
      <Dialog open={passwordModal} onClose={closePasswordModalHandler}>
        <CreatePasswordModal
          onClose={closePasswordModalHandler}
          onSuccess={() => routes.push(ROUTES.PANEL.ROOT)}
        />
      </Dialog>
      {/* // * Create Password Modal */}
    </Box>
  );
}

function FinalStepWithPassword() {
  const authFlow = useAuthFlow()!;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: authFlow.identifier,
    },
  });

  const mutation = useMutation(
    signinConfig({
      onSuccess: () => router.replace(ROUTES.PANEL.ROOT),
    }),
  );

  const submiter = async (fields: SigninVariables) => {
    await safeAsync(() => mutation.mutateAsync(fields));
  };

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <FormLayout onSubmit={form.handleSubmit(submiter)}>
        <FormLayoutField>
          <FormLayoutLable>{"رمز ورود"}</FormLayoutLable>
          <InputPassword
            {...form.register("password")}
            size="large"
            placeholder="رمز عبور خود را وارد کنید"
            error={!!form.formState.errors.password?.message}
          />
          <FormLayoutFieldError
            message={form.formState.errors.password?.message}
          />
        </FormLayoutField>
        <FormLayoutSubmit>{"ورود"}</FormLayoutSubmit>
        <Typography
          component={"button"}
          type="button"
          onClick={authFlow.goBackToEnterInfo}
          variant="body3"
          sx={{ color: "text.secondary", alignSelf: "start" }}
        >
          ویرایش {authFlow.identifier}
        </Typography>
      </FormLayout>
    </FormControl>
  );
}
//#endregion // * ------------ Auth Forms ------------

const requestOtpButton_sx = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "text.primary",
  minHeight: "20px",
};

function VerifyAuthOTPFooter() {
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
          type="button"
          onClick={authFlow.goBackToEnterInfo}
          variant="body3"
          sx={{ color: "text.secondary" }}
        >
          ویرایش {authFlow.identifier}
        </Typography>
        {!countDown.isFinished && (
          <Typography variant="body3" sx={{ color: "text.onPrimary" }}>
            {formatDuration(countDown.remainingMs)}{" "}
          </Typography>
        )}
        {countDown.isFinished && (
          <Box
            component={"button"}
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
          </Box>
        )}
      </Box>
    </>
  );
}


