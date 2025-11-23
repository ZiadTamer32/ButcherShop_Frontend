import { ceilPrice } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Minus, Plus } from "lucide-react";
import type { CartItemLocalStorage } from "@/types";
import DeleteButton from "../../components/DeleteButton";
import useGetCart from "./useGetCart";
import useUpdateCart from "./useUpdateCart";

const Cart = ({
  orderPrice,
  delivieryPrice,
}: {
  orderPrice: number;
  delivieryPrice: number;
}) => {
  const { getCart } = useGetCart();
  const { updateCart } = useUpdateCart();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col gap-3 p-4 h-full">
        <h3 className="text-xl font-semibold mb-2 border-b pb-2">
          تفاصيل الطلب
        </h3>
        {/* قائمة المنتجات */}
        <div className="flex-1 flex flex-col gap-4 max-h-[350px] overflow-y-auto pl-4">
          {getCart?.map((cartItem: CartItemLocalStorage) => (
            <div
              key={cartItem._id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-secondary/30 p-3 rounded-lg justify-between border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{cartItem.name}</span>
                  <span className="text-sm text-gray-500 font-medium">
                    السعر: {ceilPrice(cartItem.price * cartItem.quantity)} جنية
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={cartItem.quantity >= 10 || !cartItem.isAvailable}
                  onClick={() =>
                    updateCart({
                      ...cartItem,
                      quantity: cartItem.quantity + 0.25,
                    })
                  }
                >
                  <Plus />
                </Button>

                <div className="flex items-center justify-center font-semibold border border-border w-9 h-9 bg-white rounded-md">
                  {cartItem.quantity}
                </div>

                <Button
                  size="icon"
                  variant="outline"
                  disabled={cartItem.quantity <= 0.25 || !cartItem.isAvailable}
                  onClick={() =>
                    updateCart({
                      ...cartItem,
                      quantity: cartItem.quantity - 0.25,
                    })
                  }
                >
                  <Minus />
                </Button>
                <DeleteButton id={cartItem._id} />
              </div>
            </div>
          ))}
        </div>

        {/* إجمالي السعر */}
        <div className="border-t pt-2 mt-2">
          <p className="text-sm font-light text-gray-500 mb-2">
            خدمة التوصيل: {delivieryPrice} جنيه
          </p>
          <p className="text-lg font-semibold">
            الإجمالي الكلي:
            <span className="text-primary font-bold ms-2">
              {orderPrice + (delivieryPrice || 0)} جنيه
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
