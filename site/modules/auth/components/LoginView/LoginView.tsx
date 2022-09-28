import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react"
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/future/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useLogin from "@framework/auth/use-login";
import { Google } from "@components/icons";
import { useUI } from "@lib/contexts";
import { emailShape, passwordShape } from "@lib/yup";

import { AuthDialogLayout, CallToActionBtn } from "../AuthDialog";

const SOCIAL_OAUTH = [
  {
    label: "Google",
    icon: <Google boxSize={6} />,
  },
  {
    label: "Instagram",
    icon: <Image src="/instagram_logo.webp" alt="Instagram logo" width={24} height={24} />,
  },
  {
    label: "Facebook",
    icon: <Image src="/facebook_logo.png" alt="Facebook logo" width={24} height={24} />,
  },
] as const;

const loginSchema = yup
  .object()
  .shape({
    email: emailShape,
    password: passwordShape,
  })
  .required();

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginView = (): ComponentElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const { setModalView, closeModal } = useUI();

  const login = useLogin();

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    await login({ email, password });
    closeModal();
  };

  return (
    <AuthDialogLayout
      afterLink={<SocialOAuth />}
      link={{
        primaryText: "Sign up",
        secondaryText: "Don't have an account?",
        onClick: () => setModalView("SIGNUP_VIEW"),
      }}
    >
      <Flex as="form" flexDir="column" gap={6} onSubmit={handleSubmit(handleLogin)} noValidate>
        <FormControl isInvalid={!!errors.email}>
          <Input {...register("email")} type="email" placeholder="Email" autoComplete="email" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} flexDir="column" gap={2}>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          <FormHelperText alignSelf="flex-end" textAlign="right" fontSize="sm">
            Did you&nbsp;
            <Box
              as="a"
              cursor="pointer"
              color="gray.700"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
              onClick={() => setModalView("FORGOT_VIEW")}
            >
              forgot your password?
            </Box>
          </FormHelperText>
        </FormControl>

        <CallToActionBtn isLoading={isSubmitting}>Log in</CallToActionBtn>
      </Flex>
    </AuthDialogLayout>
  );
};

LoginView.displayName = "AuthLoginView";

export default LoginView;

const SocialOAuth = (): ComponentElement => {
  const googleLogin = useLogin({
    options: {
      url: "/api/auth/signin/google",
    },
  });

  return (
    <>
      <Flex align="center" gap={4} my={3}>
        {[0, 1, 2].map(i => {
          return i === 1 ? (
            <Box key={i} color="gray.600" fontSize="sm">
              or
            </Box>
          ) : (
            <Box key={i} h={0.5} mt={1} flexGrow={1} bg="gray.200" />
          );
        })}
      </Flex>

      <Flex justify="center" wrap="wrap" gap={4}>
        {SOCIAL_OAUTH.map(({ label, icon }, i) => {
          const isMinimized = label === "Instagram";

          return (
            <Flex key={i} justify="center" flexBasis={i === 0 ? "100%" : undefined}>
              <Button
                variant="outline"
                h="auto"
                px={isMinimized ? 1.5 : 2}
                py={1.5}
                gap={2}
                bg="gray.100"
                color="gray.700"
                fontSize="sm"
                fontWeight="semibold"
                onClick={() => signIn(label.toLowerCase())}
              >
                {icon}
                {!isMinimized && <>Login with {label}</>}
              </Button>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};
