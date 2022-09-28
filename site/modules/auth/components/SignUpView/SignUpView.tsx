import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useSignup from "@framework/auth/use-signup";
import { useUI } from "@lib/contexts";
import { emailShape, passwordShape } from "@lib/yup";

import { AuthDialogLayout, CallToActionBtn } from "../AuthDialog";

const signUpSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: emailShape,
    password: passwordShape,
  })
  .required();

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUpView = (): ComponentElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: yupResolver(signUpSchema) });

  const { setModalView, closeModal } = useUI();

  const signUp = useSignup();

  const handleSignUp = async ({ email, password }: SignUpFormValues) => {
    await signUp({ email, password });
    closeModal();
  };

  return (
    <AuthDialogLayout
      link={{
        primaryText: "Log in",
        secondaryText: "Already have an account?",
        onClick: () => setModalView("LOGIN_VIEW"),
      }}
    >
      <Flex as="form" flexDir="column" gap={6} onSubmit={handleSubmit(handleSignUp)} noValidate>
        <FormControl isInvalid={!!errors.firstName}>
          <Input
            {...register("firstName")}
            type="text"
            placeholder="First name"
            autoComplete="given-name"
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.lastName}>
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <Input {...register("email")} type="email" placeholder="Email" autoComplete="email" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <CallToActionBtn isLoading={isSubmitting}>Sign up</CallToActionBtn>
      </Flex>
    </AuthDialogLayout>
  );
};

SignUpView.displayName = "AuthSignUpView";

export default SignUpView;
