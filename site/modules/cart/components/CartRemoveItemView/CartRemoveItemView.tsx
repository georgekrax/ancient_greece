import { Button, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";

import { useRemoveItem } from "@framework/cart";
import { useUI } from "@lib/contexts";
import { ModalLayout } from "@modules/layout/components";

const CartRemoveItemView = (): ComponentElement => {
  const { itemIdToRemove, closeModal } = useUI();

  const removeItem = useRemoveItem();

  const handleRemove = async () => {
    try {
      await removeItem({ id: itemIdToRemove });
    } catch (error) {}
    closeModal();
  };

  return (
    <ModalLayout top={24}>
      <ModalHeader>Are you sure?</ModalHeader>
      <ModalBody>Remove this product from your cart</ModalBody>

      <ModalFooter>
        <Button colorScheme="gray" mr={3} onClick={closeModal}>
          Cancel
        </Button>
        <Button colorScheme="red" variant="ghost" onClick={handleRemove}>
          Remove
        </Button>
      </ModalFooter>
    </ModalLayout>
  );
};

CartRemoveItemView.displayName = "CartRemoveItemView";

export default CartRemoveItemView;
