import { useToken } from "@chakra-ui/react";
import { callAllHandlers } from "@chakra-ui/utils";
import { motion } from "framer-motion";
import { memo, useState } from "react";

import type { Product, ProductVariant } from "@commerce/types/product";
import { useCustomer } from "@framework/customer";
import useAddItem from "@framework/wishlist/use-add-item";
import useRemoveItem from "@framework/wishlist/use-remove-item";
import useWishlist from "@framework/wishlist/use-wishlist";
import { Iconbox, IconboxProps } from "@components/common";
import { Heart, HeartFilled } from "@components/icons";

const MotionFilledHeart = motion(HeartFilled);

export type Props = Partial<IconboxProps> & {
  productId: Product["id"];
  variant: ProductVariant;
};

const Heartbox = ({ productId, variant, boxSize, ...props }: Props): ComponentElement => {
  const [_isFavourite, setIsFavourite] = useState(false);
  const favouriteColor = useToken("colors", "orange.500");

  const { data } = useWishlist();
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const { data: customer } = useCustomer();

  const itemInWishlist = data?.items?.find(
    item => item.product_id === Number(productId) && item.variant_id === Number(variant.id)
  );
  const isFavourite = _isFavourite || !!itemInWishlist;

  // const { data: session } = useSession();

  // const { handleLogin } = useAuth({ skip: true });
  const handleClick = async () => {
    if (false && !customer) {
      // !Fix
      return openModal({ view: "LOGIN_VIEW" });
    }

    try {
      if (isFavourite) {
        setIsFavourite(false); // ! Remove
        // await removeItem({ id: itemInWishlist.id! }); // ! Uncomment
      } else {
        setIsFavourite(true); // ! Remove
        // await addItem({
        //   productId,
        //   variantId: variant.id!,
        // }) // ! Uncomment
      }
    } catch (err) {
      setIsFavourite(false); // ! Remove
    }
  };

  return (
    <Iconbox
      aria-label="Toggle to add or remove this #beach_bar to your favourites list"
      {...props}
      initial={{ borderColor: undefined }}
      animate={isFavourite ? { borderColor: favouriteColor } : "initial"}
      onClick={callAllHandlers(async () => await handleClick(), props.onClick)}
    >
      {/* <HeartFilled color="red" position="absolute" zIndex="hide" /> */}
      <Heart color="gray.600" boxSize={boxSize} />
      <MotionFilledHeart
        position="absolute"
        boxSize={boxSize}
        color={favouriteColor}
        initial={false}
        animate={{
          clipPath: `circle(${isFavourite ? 100 : 0}% at 65% 100%)`,
          transition: { duration: 0.4 },
        }}
      />
    </Iconbox>
  );
};

Heartbox.displayName = "WishlistHeartbox";

export default memo(Heartbox);
