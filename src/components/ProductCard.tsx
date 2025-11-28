import { useMemo, useState } from "react";
import type { CartItemLocalStorage } from "@/types";
import useAddCart from "../featuers/cart/useAddCart";
import toast from "react-hot-toast";
import useGetCart from "../featuers/cart/useGetCart";
import MobileCard from "./MobileCard";
import DesktopCard from "./DesktopCard";

export const ProductCard = ({ product }: { product: CartItemLocalStorage }) => {
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const { addCart } = useAddCart();
  const { getCart } = useGetCart();

  const imgUrl = useMemo(
    () => `${import.meta.env.VITE_IMAGE_UPLOAD_PATH}/${product.image}`,
    [product.image]
  );

  const cartItem = useMemo(() => {
    return getCart?.find(
      (item: CartItemLocalStorage) => item._id === product._id
    );
  }, [getCart, product._id]);

  const showQuantity = cartItem ? cartItem.quantity : 0;
  const maxQuantity = Math.max(0, 10 - showQuantity);

  const handleAddToCart = () => {
    if (!product.isAvailable || quantity <= 0 || quantity > maxQuantity) {
      return;
    }
    addCart(
      { ...product, quantity },
      {
        onSuccess: () => {
          toast.success(`تم إضافة ${product.name} إلى السلة`);
        },
      }
    );
  };

  const isLongDescription = (product.description?.length ?? 0) > 60;

  const commonProps = {
    product,
    quantity,
    maxQuantity,
    setQuantity,
    imgUrl,
    showQuantity,
    handleAddToCart,
    isLongDescription,
    setShowMore,
    showMore,
  };

  return (
    <div
      aria-label={`${product.name} product card`}
      aria-disabled={!product.isAvailable}
      className={`flex flex-col sm:flex-row gap-5 gradient-card p-4 sm:p-0 rounded-xl overflow-hidden shadow-soft hover:shadow-xl transition-smooth border border-border ${
        product.isAvailable
          ? "cursor-pointer"
          : "cursor-not-allowed bg-slate-50 opacity-50"
      }`}
    >
      {/*  Mobile layout */}
      <MobileCard {...commonProps} />
      {/* Desktop layout */}
      <DesktopCard {...commonProps} />
    </div>
  );
};
