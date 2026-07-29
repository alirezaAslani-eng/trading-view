"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ---- Types -----------------------------------------------------------
export const AUTH_FLOW_STEPS = {
  ENTER_INFO: "enter-info",
  VERIFY_INFO: "verify-info",
} as const;
export type AuthStep = (typeof AUTH_FLOW_STEPS)[keyof typeof AUTH_FLOW_STEPS];

export const AUTH_METHODS = {
  OTP: "otp",
  PASSWORD: "password",
} as const;
export type AuthMethod = (typeof AUTH_METHODS)[keyof typeof AUTH_METHODS];

interface AuthFlowState {
  step: AuthStep;
  identifier: string; // phone number
  authMethod: AuthMethod;
}

interface AuthFlowContextValue extends AuthFlowState {
  /** Save the identifier and advance to the verify-info step */
  submitIdentifier: (identifier: string) => void;
  /** Go back to enter-info (e.g. "wrong number" link) */
  goBackToEnterInfo: () => void;
  /** Switch between OTP and password login methods */
  setAuthMethod: (method: AuthMethod) => void;
  /** Reset the whole flow */
  reset: () => void;
}

const initialState: AuthFlowState = {
  step: "enter-info",
  identifier: "",
  authMethod: "otp",
};

// ---- Context -----------------------------------------------------------

const AuthFlowContext = createContext<AuthFlowContextValue | undefined>(
  undefined,
);

export function AuthFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthFlowState>(initialState);

  const submitIdentifier = useCallback((identifier: string) => {
    setState((prev) => ({ ...prev, step: "verify-info", identifier }));
  }, []);

  const goBackToEnterInfo = useCallback(() => {
    setState((prev) => ({ ...prev, step: "enter-info" }));
  }, []);

  const setAuthMethod = useCallback((method: AuthMethod) => {
    setState((prev) => ({ ...prev, authMethod: method }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const value: AuthFlowContextValue = {
    ...state,
    submitIdentifier,
    goBackToEnterInfo,
    setAuthMethod,
    reset,
  };

  return (
    <AuthFlowContext.Provider value={value}>
      {children}
    </AuthFlowContext.Provider>
  );
}

// ---- Hook -----------------------------------------------------------

export function useAuthFlow() {
  const ctx = useContext(AuthFlowContext);
  return ctx;
}

//#region // * ------------ Heading content ------------
const authHeadingContent = {
  [AUTH_FLOW_STEPS.ENTER_INFO]: {
    title: "به آیرونکس خوش آمدید",
    subTitle: "جهت عضویت و ورود به پلتفرم، شماره تماس خود را وارد کنید",
  },
  [AUTH_FLOW_STEPS.VERIFY_INFO]: {
    [AUTH_METHODS.OTP]: {
      title: "کد تایید را وارد کنید",
      subTitle: "کد ۶ رقمی ارسال شده به شماره خود را وارد کنید",
    },
    [AUTH_METHODS.PASSWORD]: {
      title: "ورود با رمز عبور",
      subTitle: "رمز عبور حساب کاربری خود را وارد کنید",
    },
  },
} as const;
export function getAuthHeadingContent(step: AuthStep, authMethod: AuthMethod) {
  if (step === AUTH_FLOW_STEPS.ENTER_INFO) {
    return authHeadingContent[AUTH_FLOW_STEPS.ENTER_INFO];
  }

  return authHeadingContent[AUTH_FLOW_STEPS.VERIFY_INFO][authMethod];
}
