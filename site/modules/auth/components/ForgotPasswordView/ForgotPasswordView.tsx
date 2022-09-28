import { Flex, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useUI } from "@lib/contexts";
import { emailShape } from "@lib/yup";

import { AuthDialogLayout, CallToActionBtn } from "../AuthDialog";

const forgotPasswordSchema = yup.object().shape({ email: emailShape }).required();

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordView = (): ComponentElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: yupResolver(forgotPasswordSchema) });

  const { setModalView, closeModal } = useUI();

  const handleResetPassword = async ({ email }: ForgotPasswordFormValues) => {
    setModalView("LOGIN_VIEW");
  };

  return (
    <AuthDialogLayout
      link={{
        primaryText: "Log in",
        secondaryText: "Remembered your password?",
        onClick: () => setModalView("LOGIN_VIEW"),
      }}
    >
      <Flex
        as="form"
        flexDir="column"
        gap={6}
        onSubmit={handleSubmit(handleResetPassword)}
        noValidate
      >
        <FormControl isInvalid={!!errors.email}>
          <Input {...register("email")} type="email" placeholder="Email" autoComplete="email" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <CallToActionBtn isLoading={isSubmitting}>Recover password</CallToActionBtn>
      </Flex>
    </AuthDialogLayout>
  );
};

ForgotPasswordView.displayName = "AuthForgotPasswordView";

export default ForgotPasswordView;
