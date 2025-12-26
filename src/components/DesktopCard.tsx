import { sliceText } from "../lib/utils";
import type { ProductCardProps } from "../types";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

const DesktopCard = ({
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
  isOpen,
}: ProductCardProps) => {
  return (
    <div className="hidden sm:flex w-full flex-col justify-between flex-1">
      <div className="overflow-hidden">
        {product.isAvailable ? (
          <div className="relative overflow-hidden">
            {showQuantity > 0 && (
              <span className="absolute top-2 right-2 bg-secondary rounded-full px-3 py-1.5 text-secondary-foreground text-sm font-bold shadow-md z-10">
                {showQuantity}
              </span>
            )}

            <img
              loading="lazy"
              src={imgUrl || ""}
              alt={product.name}
              className="w-full h-64 object-cover hover:scale-105 transition-smooth"
            />
          </div>
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

      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3
          className="text-xl font-bold text-foreground mb-2"
          title={product.name}
        >
          {sliceText(product.name)}
        </h3>

        <div className="mb-4">
          <p className="text-muted-foreground inline">
            {showMore ? product.description : sliceText(product.description)}
          </p>
          {isLongDescription && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-primary text-sm font-medium mr-2 inline-flex items-center hover:underline"
            >
              {showMore ? (
                <>
                  عرض أقل <ChevronUp className="w-4 h-4 mr-0.5" />
                </>
              ) : (
                <>
                  عرض المزيد <ChevronDown className="w-4 h-4 mr-0.5" />
                </>
              )}
            </button>
          )}
        </div>

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
            aria-label="Increase Quantity"
            disabled={quantity >= maxQuantity || !product.isAvailable}
            onClick={() =>
              setQuantity((prev) => Math.min(prev + 0.25, maxQuantity))
            }
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
            aria-label="Decrease Quantity"
            onClick={() => setQuantity(Math.max(0.25, quantity - 0.25))}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>
        <Tooltip
          content="المحل مغلق حالياً. ساعات العمل من 9 صباحاً حتى 6 مساءً"
          show={!isOpen}
        >
          <Button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            disabled={
              quantity <= 0 ||
              !product.isAvailable ||
              quantity > maxQuantity ||
              !isOpen
            }
            className="w-full mt-4"
          >
            <ShoppingCart className="w-4 h-4" />
            إضافة للسلة
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default DesktopCard;
