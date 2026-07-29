"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// REFINE: This context shares common ground with SigninFlowContext
// (identifier state, step state, back-navigation pattern). Consider
// extracting a shared base (e.g. identifier + step machine) and composing
// signin/signup-specific fields (method, set-password step) on top of it.

export const SIGNUP_STEP = {
  ENTER_INFO: "enter_info",
  VERIFY_INFO: "verify_info",
  SET_PASSWORD: "set_password",
} as const;

type SignupStep = (typeof SIGNUP_STEP)[keyof typeof SIGNUP_STEP];

type SignupFlowContextValue = {
  step: SignupStep;
  identifier: string;
  submitPhone: (identifier: string) => void;
  goToVerify: () => void;
  goBackToPhone: () => void;
  goToSetPassword: () => void;
};

const SignupFlowContext = createContext<SignupFlowContextValue | null>(null);

type SignupFlowProviderProps = {
  children: ReactNode;
};

export const SignupFlowProvider = ({ children }: SignupFlowProviderProps) => {
  const [step, setStep] = useState<SignupStep>(SIGNUP_STEP.ENTER_INFO);
  const [identifier, setIdentifier] = useState("");

  const submitPhone = (identifier: string) => {
    setIdentifier(identifier);
    setStep(SIGNUP_STEP.VERIFY_INFO);
    return;
  };

  const goToVerify = () => {
    setStep(SIGNUP_STEP.VERIFY_INFO);
    return;
  };

  const goBackToPhone = () => {
    setStep(SIGNUP_STEP.ENTER_INFO);
    return;
  };

  const goToSetPassword = () => {
    setStep(SIGNUP_STEP.SET_PASSWORD);
    return;
  };

  const value: SignupFlowContextValue = {
    step,
    identifier,
    submitPhone,
    goToVerify,
    goBackToPhone,
    goToSetPassword,
  };

  return (
    <SignupFlowContext.Provider value={value}>
      {children}
    </SignupFlowContext.Provider>
  );
};

export const useSignupFlow = () => {
  const context = useContext(SignupFlowContext);
  return context;
};
