import { DrawerBody, DrawerHeader, Flex, FlexProps } from "@chakra-ui/react";

import { Iconbox } from "@components/common";
import { ArrowLeft } from "@components/icons";
import { useUI } from "@lib/contexts";

type Props = React.PropsWithChildren &
  FlexProps & {
    header?: React.ComponentProps<typeof DrawerHeader>;
    body?: React.ComponentProps<typeof DrawerBody>;
    handleBack?: () => void;
  };

const SidebarLayout = ({
  header,
  body,
  handleBack,
  children,
  ...props
}: Props): ComponentElement => {
  const { closeSidebar } = useUI();

  return (
    <Flex flexDir="column" {...props}>
      {header && (
        <DrawerHeader as={Flex} alignItems="center" gap={4} fontWeight="bold" {...header}>
          <Iconbox aria-label="Go to back step" onClick={handleBack ?? (() => closeSidebar())}>
            <ArrowLeft />
          </Iconbox>
          {header.children}
        </DrawerHeader>
      )}

      <DrawerBody {...body}>{children}</DrawerBody>
    </Flex>
  );
};

export default SidebarLayout;
