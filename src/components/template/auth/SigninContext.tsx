"use client";

import { createContext, useContext, useState, type ReactNode } from "react";


// REFINE: This context shares common ground with SignupFlowContext
// (identifier state, step state, back-navigation pattern). Consider
// extracting a shared base (e.g. identifier + step machine) and composing
// signin/signup-specific fields (method, set-password step) on top of it.

export const SIGNIN_STEP = {
  ENTER_INFO: "enter_info",
  ENTER_PASSWORD: "enter_password",
} as const;

type SigninStep = (typeof SIGNIN_STEP)[keyof typeof SIGNIN_STEP];

export const SIGNIN_METHOD = {
  OTP: "otp",
  PASSWORD: "password",
} as const;

type SigninMethod = (typeof SIGNIN_METHOD)[keyof typeof SIGNIN_METHOD];

type SigninFlowContextValue = {
  step: SigninStep;
  identifier: string;
  method: SigninMethod;
  setMethod: (method: SigninMethod) => void;
  submitInfo: (identifier: string) => void;
  goBackToEnterInfo: () => void;
};

const SigninFlowContext = createContext<SigninFlowContextValue | null>(null);

type SigninFlowProviderProps = {
  children: ReactNode;
};

export const SigninFlowProvider = ({ children }: SigninFlowProviderProps) => {
  const [step, setStep] = useState<SigninStep>(SIGNIN_STEP.ENTER_INFO);
  const [identifier, setIdentifier] = useState("");
  const [method, setMethod] = useState<SigninMethod>(SIGNIN_METHOD.OTP);

  const submitInfo = (identifier: string) => {
    setIdentifier(identifier);
    setStep(SIGNIN_STEP.ENTER_PASSWORD);
    return;
  };

  const goBackToEnterInfo = () => {
    setStep(SIGNIN_STEP.ENTER_INFO);
    return;
  };

  const value: SigninFlowContextValue = {
    step,
    identifier,
    method,
    setMethod,
    submitInfo,
    goBackToEnterInfo,
  };

  return (
    <SigninFlowContext.Provider value={value}>
      {children}
    </SigninFlowContext.Provider>
  );
};

export const useSigninFlow = () => {
  const context = useContext(SigninFlowContext);
  return context;
};
