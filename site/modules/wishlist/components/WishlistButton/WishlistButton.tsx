import cn from "clsx";
import { useState } from "react";

import type { Product, ProductVariant } from "@commerce/types/product";
import useCustomer from "@framework/customer/use-customer";
import useAddItem from "@framework/wishlist/use-add-item";
import useRemoveItem from "@framework/wishlist/use-remove-item";
import useWishlist from "@framework/wishlist/use-wishlist";
import { Heart } from "@components/icons";
import { useUI } from "@lib/contexts";

import s from "./WishlistButton.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  productId: Product["id"];
  variant: ProductVariant;
};

const WishlistButton = ({ productId, variant, className, ...props }: Props): ComponentElement => {
  const [loading, setLoading] = useState(false);

  const { openModal, setModalView } = useUI();

  const { data } = useWishlist();
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const { data: customer } = useCustomer();

  // @ts-ignore Wishlist is not always enabled
  const itemInWishlist = data?.items?.find(
    // @ts-ignore Wishlist is not always enabled
    item => item.product_id === Number(productId) && item.variant_id === Number(variant.id)
  );

  const handleWishlistChange = async (e: any) => {
    e.preventDefault();

    if (loading) return;

    // A login is required before adding an item to the wishlist
    if (!customer) return openModal({ view: "LOGIN_VIEW" });

    setLoading(true);

    try {
      if (itemInWishlist) {
        await removeItem({ id: itemInWishlist.id! });
      } else {
        await addItem({
          productId,
          variantId: variant?.id!,
        });
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <button
      aria-label="Add to wishlist"
      className={cn(s.root, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart
        className={cn(s.icon, {
          [s.loading]: loading,
          [s.inWishlist]: itemInWishlist,
        })}
      />
    </button>
  );
};

export default WishlistButton;
