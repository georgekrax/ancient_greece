import { Button, ButtonProps } from "@chakra-ui/react";

const CallToActionBtn = ({ children, ...props }: ButtonProps): ComponentElement => {
  return (
    <Button type="submit" colorScheme="primary" alignSelf="center" mt={4} px={10} {...props}>
      {children}
    </Button>
  );
};

CallToActionBtn.displayName = "AuthCallToActionBtn";

export default CallToActionBtn;
