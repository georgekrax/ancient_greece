import { DrawerCloseButton, ButtonProps, ModalContent, ModalContentProps } from "@chakra-ui/react";

type Props = ModalContentProps & {
  closeBtn?: false | ButtonProps;
};

const ModalLayout = ({ closeBtn, children, ...props }: Props): ComponentElement => {
  return (
    <ModalContent borderRadius="2xl" {...props}>
      {closeBtn !== false && <DrawerCloseButton {...closeBtn} />}
      {children}
    </ModalContent>
  );
};

ModalLayout.displayName = "ModalLayout";

export default ModalLayout;
