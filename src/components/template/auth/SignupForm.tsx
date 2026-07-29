"use client";
import InputPhoneNumber from "@/components/ui/Input/InputPhoneNumber";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import requestAuthOTPSchema from "@/validations/auth/requestAuthOTPSchema";
import { authContent } from "@/content/auth";
import AuthFormLayoutField from "../Layout/AuthFormLayout/AuthFormLayoutField";
import AuthFormLayoutLable from "../Layout/AuthFormLayout/AuthFormLayoutLable";
import AuthFormLayoutSubmit from "../Layout/AuthFormLayout/AuthFormLayoutSubmit";
import { Box, FormControl, Typography } from "@mui/material";
import AuthFormLayout from "../Layout/AuthFormLayout/AuthFormLayout";
import AuthFormLayoutHeading from "../Layout/AuthFormLayout/AuthFormLayoutHeading";
import AuthFormLayoutContainer from "../Layout/AuthFormLayout/AuthFormLayoutContainer";
import AuthFormLayoutToggleButoon from "../Layout/AuthFormLayout/AuthFormLayoutToggleButoon";
import { SIGNUP_STEP, useSignupFlow } from "./SignupContext";
import {
  RequestAuthOTPSchemaType,
  VerifyAuthOTPSchemaType,
} from "@/validations/types";
import verifyAuthOTPSchema from "@/validations/auth/verifyAuthOTPSchema";
import { verifyAuthOTPConfig } from "@/packages/react-query";
import { useMutation } from "@tanstack/react-query";
import safeAsync from "@/utils/app/safeAsync";
import InputVerifyCode from "../Input/InputVerifyCode";
import useRequestAuthOTP from "@/hooks/features/auth/useRequestAuthOTP";
import useCountdown from "@/hooks/app/useCountdown";
import { normalizeOtpExpIn } from "@/utils";
import formatDuration from "@/utils/app/formatMsDuration";
import { RestartRightIcon } from "@/components/ui/Icon";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import InputText from "@/components/ui/Input/InputText";
import { SIGNIN_STEP, SIGNIN_METHOD, useSigninFlow } from "./SigninContext";
import {
  FormLayout,
  FormLayoutCheckboxGroup,
  FormLayoutField,
  FormLayoutFieldError,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  createPasswordConfig,
  signinConfig,
} from "@/v2-architecture/src/features/auth/react-query";
import {
  CreatePasswordSchema,
  createPasswordSchema,
} from "@/validations/auth/createPasswordSchema";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant/app/routes";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import { SigninSchema, signinSchema } from "@/validations/auth/signinSchema";

//#region // * ------------ Signup ------------
const headingContent = {
  [SIGNUP_STEP.ENTER_INFO]: {
    title: "به آیرونکس خوش آمدید",
    subTitle: "جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید",
  },
  [SIGNUP_STEP.VERIFY_INFO]: {
    title: "کد تایید را وارد کنید",
    subTitle: "کد ارسال شده به شماره تماس خود را وارد کنید",
  },
  [SIGNUP_STEP.SET_PASSWORD]: {
    title: "رمز عبور خود را تنظیم کنید",
    subTitle: "برای ورود به پنل، یک رمز عبور تنظیم کنید",
  },
};

export function SignupForm() {
  const { step } = useSignupFlow()!;
  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title={headingContent[step].title}
        subTitle={headingContent[step].subTitle}
      />
      <AuthFormLayoutContainer>
        {step !== SIGNUP_STEP.SET_PASSWORD && <AuthFormLayoutToggleButoon />}
        {step === SIGNUP_STEP.ENTER_INFO && <EnterInfoStep />}
        {step === SIGNUP_STEP.VERIFY_INFO && <VerifyInfoStep />}
        {step === SIGNUP_STEP.SET_PASSWORD && <SetPasswordStep />}
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

function EnterInfoStep() {
  const signupFlow = useSignupFlow()!;

  const form = useForm({
    resolver: zodResolver(requestAuthOTPSchema),
    defaultValues: {
      identifier: signupFlow.identifier,
    },
  });

  const onSubmit = (values: RequestAuthOTPSchemaType) => {
    signupFlow.submitPhone(values.identifier);
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <AuthFormLayoutField>
        <AuthFormLayoutLable>
          {authContent.requestOtpContent.phoneInputLable}
        </AuthFormLayoutLable>
        <InputPhoneNumber
          {...form.register("identifier")}
          error={!!form.formState.errors.identifier}
        />
      </AuthFormLayoutField>
      <AuthFormLayoutSubmit>{"ارسال کد"}</AuthFormLayoutSubmit>
    </Box>
  );
}
function VerifyInfoStep() {
  const signupFlow = useSignupFlow()!;

  const form = useForm({
    resolver: zodResolver(verifyAuthOTPSchema),
    defaultValues: {
      identifier: signupFlow.identifier,
    },
  });

  const mutation = useMutation(
    verifyAuthOTPConfig({
      onSuccess: () => signupFlow.goToSetPassword(),
      meta: {
        disableSuccessAlert: true,
      },
    }),
  );

  const submitHandler = async (fields: VerifyAuthOTPSchemaType) => {
    await safeAsync(async () => mutation.mutateAsync(fields));
  };

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <Box component={"form"} onSubmit={form.handleSubmit(submitHandler)}>
        <FormLayoutField>
          <FormLayoutLable>{"کد یکبار مصرف"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => {
              return (
                <InputVerifyCode
                  onComplete={field.onChange}
                  error={fieldState.invalid}
                />
              );
            }}
          />
        </FormLayoutField>
        <FormLayoutSubmit sx={{ mt: "32px" }} fullWidth>
          {"تایید و ادامه"}
        </FormLayoutSubmit>
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
            onClick={signupFlow.goBackToPhone}
            variant="body3"
            sx={{ color: notDefinedColors["#C6C6C6"], cursor: "pointer" }}
          >
            ویرایش {signupFlow.identifier}
          </Typography>

          <RequestOtpButton identifier={signupFlow.identifier} />
        </Box>
      </Box>
    </FormControl>
  );
}

function SetPasswordStep() {
  const router = useRouter();

  const mutation = useMutation(
    createPasswordConfig({
      onSuccess: () => router.replace(ROUTES.PANEL.ROOT),
    }),
  );

  const form = useForm({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      NewPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: CreatePasswordSchema) => {
    await safeAsync(() => mutation.mutateAsync(values));
  };

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <FormLayout component={"form"} onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayoutField>
          <AuthFormLayoutLable>{"رمز عبور"}</AuthFormLayoutLable>
          <InputText
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            size="large"
            error={!!form.formState.errors.NewPassword?.message}
            {...form.register("NewPassword")}
          />
          <FormLayoutFieldError
            message={form.formState.errors.NewPassword?.message}
          />
          <InputText
            type="password"
            placeholder="تکرار رمز عبور"
            size="large"
            error={!!form.formState.errors.confirmPassword?.message}
            {...form.register("confirmPassword")}
          />
          <FormLayoutFieldError
            message={form.formState.errors.confirmPassword?.message}
          />
        </FormLayoutField>

        <FormLayoutSubmit>{"ایجاد رمز و ورود"}</FormLayoutSubmit>
      </FormLayout>
    </FormControl>
  );
}

const requestOtpButton_sx = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "text.primary",
  minHeight: "20px",
};

type RequestOtpButtonProps = {
  identifier: string;
};

function RequestOtpButton({ identifier }: RequestOtpButtonProps) {
  const mutation = useRequestAuthOTP(identifier);

  const countDown = useCountdown(
    normalizeOtpExpIn(mutation.data, mutation.error),
  );

  const requestOtp = async () => {
    mutation.mutate({ identifier });
  };

  return (
    <>
      {!countDown.isFinished && (
        <Typography variant="body3" sx={{ color: "text.onPrimary" }}>
          {formatDuration(countDown.remainingMs)}
        </Typography>
      )}
      {countDown.isFinished && (
        <Box
          component={"button"}
          disabled={mutation.isPending}
          onClick={requestOtp}
          type="button"
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
    </>
  );
}
//#endregion // * ------------ Signup ------------

//#region // * ------------ Signin ------------
const signinHeadingContent = {
  [SIGNIN_STEP.ENTER_INFO]: {
    title: "به آیرونکس خوش آمدید",
    subTitle: "جهت ورود به پلتفرم، شماره تماس خود را وارد کنید",
  },
  [SIGNIN_STEP.ENTER_PASSWORD]: {
    title: "ورود به حساب کاربری",
    subTitle: "رمز عبور یا کد یک‌بارمصرف خود را وارد کنید",
  },
};

export function SigninForm() {
  const { step } = useSigninFlow()!;

  return (
    <AuthFormLayout>
      <AuthFormLayoutHeading
        title={signinHeadingContent[step].title}
        subTitle={signinHeadingContent[step].subTitle}
      />
      <AuthFormLayoutContainer>
        <AuthFormLayoutToggleButoon />
        {step === SIGNIN_STEP.ENTER_INFO && <SigninEnterInfoStep />}
        {step === SIGNIN_STEP.ENTER_PASSWORD && <SigninEnterPasswordStep />}
      </AuthFormLayoutContainer>
    </AuthFormLayout>
  );
}

function SigninEnterInfoStep() {
  const signinFlow = useSigninFlow()!;

  const form = useForm({
    resolver: zodResolver(requestAuthOTPSchema),
    defaultValues: {
      identifier: signinFlow.identifier,
    },
  });

  const onSubmit = (values: RequestAuthOTPSchemaType) => {
    signinFlow.submitInfo(values.identifier);
  };

  return (
    <FormLayout component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutField>
        <FormLayoutLable>{"شماره موبایل"}</FormLayoutLable>
        <InputPhoneNumber
          {...form.register("identifier")}
          error={!!form.formState.errors.identifier}
        />
      </FormLayoutField>

      <FormLayoutCheckboxGroup>
        <CheckBox
          label="ورود با رمز"
          checked={signinFlow.method === SIGNIN_METHOD.PASSWORD}
          onChange={(_, checked) =>
            signinFlow.setMethod(
              checked ? SIGNIN_METHOD.PASSWORD : SIGNIN_METHOD.OTP,
            )
          }
        />
      </FormLayoutCheckboxGroup>

      <FormLayoutSubmit>{"ادامه"}</FormLayoutSubmit>
    </FormLayout>
  );
}

function SigninEnterPasswordStep() {
  const signinFlow = useSigninFlow()!;

  return (
    <>
      {signinFlow.method === SIGNIN_METHOD.PASSWORD && (
        <SigninWithPasswordStep />
      )}
      {signinFlow.method === SIGNIN_METHOD.OTP && <SigninWithOtpStep />}
    </>
  );
}

function SigninWithPasswordStep() {
  const signinFlow = useSigninFlow()!;
  const router = useRouter();

  const mutation = useMutation(
    signinConfig({
      onSuccess: () => router.replace(ROUTES.PANEL.ROOT),
    }),
  );

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      password: "",
      identifier: signinFlow.identifier,
    },
  });

  const onSubmit = async (values: SigninSchema) => {
    await safeAsync(() => mutation.mutateAsync(values));
  };

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <Box component={"form"} onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayoutField>
          <FormLayoutLable>{"رمز عبور"}</FormLayoutLable>
          <InputText
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            size="large"
            {...form.register("password")}
          />
        </FormLayoutField>

        <FormLayoutSubmit sx={{ mt: "32px" }}>
          {"تایید و ورود"}
        </FormLayoutSubmit>

        <Typography
          component={"button"}
          onClick={signinFlow.goBackToEnterInfo}
          variant="body3"
          sx={{
            mt: "18px",
            cursor: "pointer",
            color: "text.secondary",
            alignItems: "start",
          }}
        >
          ویرایش {signinFlow.identifier}
        </Typography>
      </Box>
    </FormControl>
  );
}

function SigninWithOtpStep() {
  const signinFlow = useSigninFlow()!;
  const router = useRouter();

  const mutation = useMutation(
    verifyAuthOTPConfig({
      onSuccess: () => router.replace(ROUTES.PANEL.ROOT),
      meta: {
        disableSuccessAlert: true,
      },
    }),
  );

  const form = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: { code: string }) => {
    await safeAsync(() =>
      mutation.mutateAsync({
        identifier: signinFlow.identifier,
        code: values.code,
      }),
    );
  };

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutField>
        <FormLayoutLable>{"کد یکبار مصرف"}</FormLayoutLable>
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <InputVerifyCode
              onComplete={field.onChange}
              error={fieldState.invalid}
            />
          )}
        />
      </FormLayoutField>

      <FormLayoutSubmit>{"تایید و ورود"}</FormLayoutSubmit>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component={"button"}
          onClick={signinFlow.goBackToEnterInfo}
          variant="body3"
          sx={{ mt: "18px", cursor: "pointer", color: "text.secondary" }}
        >
          ویرایش {signinFlow.identifier}
        </Typography>

        <RequestOtpButton identifier={signinFlow.identifier} />
      </Box>
    </FormLayout>
  );
}
//#endregion // * ------------ Signin ------------
