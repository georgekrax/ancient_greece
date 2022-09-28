import { AnimatePresence } from "framer-motion";

import { useUI } from "@lib/contexts";
import { ModalLayout } from "@modules/layout/components";

import ForgotPasswordView from "../ForgotPasswordView";
import LoginView from "../LoginView";
import SignUpView from "../SignUpView";

const AuthDialog = (): ComponentElement => {
  const { modalView } = useUI();

  return (
    <ModalLayout
      closeBtn={false}
      overflow="hidden"
      m={{ base: 0, sm: 16 }}
      w={{ base: "100vw", sm: undefined }}
      h={{ base: "100vh", sm: "auto" }}
      maxW={{ base: "auto", sm: 96 }}
      borderRadius={{ base: 0, sm: "2xl" }}
    >
      <AnimatePresence initial={false} mode="wait">
        {modalView === "LOGIN_VIEW" && <LoginView key="LOGIN_VIEW" />}
        {modalView === "SIGNUP_VIEW" && <SignUpView key="SIGNUP_VIEW" />}
        {modalView === "FORGOT_VIEW" && <ForgotPasswordView key="FORGOT_VIEW" />}
      </AnimatePresence>
    </ModalLayout>
  );
};

AuthDialog.displayName = "AuthDialog";

export default AuthDialog;
