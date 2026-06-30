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

interface AuthFlowState {
  step: AuthStep;
  identifier: string; // phone number
}

interface AuthFlowContextValue extends AuthFlowState {
  /** Save the identifier and advance to the verify-info step */
  submitIdentifier: (identifier: string) => void;
  /** Go back to enter-info (e.g. "wrong number" link) */
  goBackToEnterInfo: () => void;
  /** Reset the whole flow */
  reset: () => void;
}

const initialState: AuthFlowState = {
  step: "enter-info",
  identifier: "",
};

// ---- Context -----------------------------------------------------------

const AuthFlowContext = createContext<AuthFlowContextValue | undefined>(
  undefined,
);

export function AuthFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthFlowState>(initialState);

  const submitIdentifier = useCallback((identifier: string) => {
    setState({ step: "verify-info", identifier });
  }, []);

  const goBackToEnterInfo = useCallback(() => {
    setState((prev) => ({ ...prev, step: "enter-info" }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const value: AuthFlowContextValue = {
    ...state,
    submitIdentifier,
    goBackToEnterInfo,
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
