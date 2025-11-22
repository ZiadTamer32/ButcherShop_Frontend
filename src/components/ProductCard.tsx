import { useState } from "react";
import { Button } from "../components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { sliceText } from "../lib/utils";
import type { CartItemLocalStorage } from "@/types";
import useAddCart from "../featuers/cart/useAddCart";
import toast from "react-hot-toast";

export const ProductCard = ({ product }: { product: CartItemLocalStorage }) => {
  const [quantity, setQuantity] = useState(1);
  const { addCart } = useAddCart();

  const imgUrl = `${import.meta.env.VITE_IMAGE_UPLOAD_PATH}/${product.image}`;

  const handleAddToCart = () => {
    if (quantity > 0) {
      addCart(
        { ...product, quantity },
        {
          onSuccess: () => toast.success(`تم إضافة ${product.name} إلى السلة`),
        }
      );
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-5 gradient-card p-4 sm:p-0 rounded-xl overflow-hidden shadow-soft hover:shadow-xl transition-smooth border border-border ${
        product.isAvailable
          ? "cursor-pointer"
          : "cursor-not-allowed bg-slate-50 opacity-50"
      }`}
    >
      {/*  Mobile layout */}
      <div className="flex sm:hidden items-center justify-between w-full">
        <div className="flex-1">
          <h3
            className="text-lg font-bold text-foreground mb-1 cursor-pointer hover:whitespace-normal"
            title={product.name}
          >
            {sliceText(product.name)}
          </h3>

          <p
            className="text-sm text-muted-foreground mb-2 cursor-pointer line-clamp-2 hover:line-clamp-none p-1"
            title={product.description}
          >
            {sliceText(product.description)}
          </p>

          <div className="text-lg font-bold text-primary mb-2">
            {product.price} ج.م
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantity(quantity + 0.25)}
              disabled={quantity >= 10 || !product.isAvailable}
              className="h-7 w-7"
            >
              <Plus className="w-3 h-3" />
            </Button>

            <p className="text-sm border rounded-sm py-0.5 w-7 text-center">
              {quantity}
            </p>

            <Button
              size="icon"
              variant="outline"
              disabled={quantity <= 0.25 || !product.isAvailable}
              onClick={() => setQuantity(Math.max(0.25, quantity - 0.25))}
              className="h-7 w-7"
            >
              <Minus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          {product.isAvailable ? (
            <img
              loading="lazy"
              src={imgUrl}
              alt={product.name}
              className="w-24 h-24 rounded-xl object-cover border border-border"
            />
          ) : (
            <div className="relative">
              <img
                loading="lazy"
                src={imgUrl}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover border border-border opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                <p className="text-white text-xs font-bold">غير متوفر</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        size="sm"
        onClick={handleAddToCart}
        disabled={quantity <= 0 || !product.isAvailable}
        className="text-xs w-full sm:hidden mt-2"
      >
        <ShoppingCart className="w-4 h-4" />
        إضافة إلي السلة
      </Button>

      {/* Desktop layout */}
      <div className="hidden sm:block w-full">
        <div className="overflow-hidden">
          {product.isAvailable ? (
            <img
              loading="lazy"
              src={imgUrl || ""}
              alt={product.name}
              className="w-full h-64 object-cover hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="relative overflow-hidden">
              <img
                loading="lazy"
                src={imgUrl || ""}
                alt={product.name}
                className="w-full h-64 object-cover hover:scale-105 transition-smooth opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <p className="text-white text-lg font-bold">غير متوفر</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3
            className="text-xl font-bold text-foreground mb-2"
            title={product.name}
          >
            {sliceText(product.name)}
          </h3>

          <p
            className="text-muted-foreground mb-4 line-clamp-2"
            title={product.description}
          >
            {sliceText(product.description)}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary">
              {product.price} ج.م
            </span>
            <span className="text-sm text-muted-foreground">
              {product.category === "beef" ? "كندوز" : "ضاني"}/كيلو
            </span>
          </div>
          <div className="flex gap-3 justify-between">
            <Button
              className="basis-1/3"
              variant="outline"
              disabled={quantity >= 10 || !product.isAvailable}
              onClick={() => setQuantity(quantity + 0.25)}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <p className="basis-1/3 border rounded-md text-center">
              <span className="block mt-1.5">{quantity}</span>
            </p>
            <Button
              disabled={quantity <= 0.25 || !product.isAvailable}
              className="basis-1/3"
              variant="outline"
              onClick={() => setQuantity(Math.max(0.25, quantity - 0.25))}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={quantity <= 0 || !product.isAvailable}
            className="w-full mt-4"
          >
            <ShoppingCart className="w-4 h-4" />
            إضافة للسلة
          </Button>
        </div>
      </div>
    </div>
  );
};
