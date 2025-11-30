import { sliceText } from "../lib/utils";
import type { ProductCardProps } from "../types";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

const MobileCard = ({
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
}: ProductCardProps) => {
  return (
    <>
      <div className="flex sm:hidden items-center justify-between w-full">
        <div className="flex-1">
          <h3
            className="text-lg font-bold text-foreground mb-1"
            title={product.name}
          >
            {sliceText(product.name)}
          </h3>

          <div className="p-2 pr-0">
            <p className="text-sm text-muted-foreground inline">
              {showMore ? product.description : sliceText(product.description)}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-primary text-sm font-medium mr-1 inline-flex items-center hover:underline"
              >
                {showMore ? (
                  <>
                    عرض أقل <ChevronUp className="w-3 h-3 mr-0.5" />
                  </>
                ) : (
                  <>
                    عرض المزيد <ChevronDown className="w-3 h-3 mr-0.5" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="text-lg font-bold text-primary mb-2">
            {product.price} ج.م
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              aria-label="Increase Quantity"
              onClick={() =>
                setQuantity((prev) => Math.min(prev + 0.25, maxQuantity))
              }
              disabled={quantity >= maxQuantity || !product.isAvailable}
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
              aria-label="Decrease Quantity"
              disabled={quantity <= 0.25 || !product.isAvailable}
              onClick={() => setQuantity(Math.max(0.25, quantity - 0.25))}
              className="h-7 w-7"
            >
              <Minus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          {showQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary rounded-full px-2 py-1 text-secondary-foreground text-xs font-bold shadow-md z-10">
              {showQuantity}
            </span>
          )}

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
        aria-label="Add to cart"
        onClick={handleAddToCart}
        disabled={
          quantity <= 0 || !product.isAvailable || quantity > maxQuantity
        }
        className="text-xs w-full sm:hidden mt-2"
      >
        <ShoppingCart className="w-4 h-4" />
        إضافة إلي السلة
      </Button>
    </>
  );
};

export default MobileCard;
