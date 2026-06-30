"use client";
import {
  AUTH_FLOW_STEPS,
  AuthFlowProvider,
  useAuthFlow,
} from "@/context/feature/auth/AuthFlow/AuthFlowContext";
import { ReactElement } from "react";

interface AuthFlowRendererProps {
  enterInfoStep: ReactElement;
  verifyInfoStep: ReactElement;
}

function AuthFlowRenderer_({
  enterInfoStep,
  verifyInfoStep,
}: AuthFlowRendererProps) {
  const authFlow = useAuthFlow()!;
  return (
    <>
      {authFlow.step === AUTH_FLOW_STEPS.ENTER_INFO && enterInfoStep}
      {authFlow.step === AUTH_FLOW_STEPS.VERIFY_INFO && verifyInfoStep}
    </>
  );
}

function AuthFlowRenderer(props: AuthFlowRendererProps) {
  return (
    <AuthFlowProvider>
      <AuthFlowRenderer_ {...props} />
    </AuthFlowProvider>
  );
}

export default AuthFlowRenderer;
