import { SignupFlowProvider } from "@/components/template/auth/SignupContext";
import { SignupForm } from "@/components/template/auth/SignupForm";
import { AuthPageLayoutFormContainer } from "@/components/ui/Layout/AuthPageLayout";

function page() {
  return (
    <AuthPageLayoutFormContainer>
      <SignupFlowProvider>
        <SignupForm />
      </SignupFlowProvider>
    </AuthPageLayoutFormContainer>
  );
}

export default page;
