/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "../components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { ceilPrice, zonesWithPrices } from "../lib/utils";
import type { CartItemLocalStorage, Order } from "@/types";
import ConfirmButton from "../components/ConfirmButton";
import useGetCart from "../featuers/cart/useGetCart";
import useCreateOrder from "../featuers/orders/useCreateOrder";
import Spinner from "../components/Spinner";
import Cart from "../featuers/cart/Cart";

interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  zone: string;
  address: string;
  additionalInfo: string;
}

const ConfirmPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, control, watch } = useForm<CustomerInfo>();

  const { getCart, isGetting } = useGetCart();
  const { createOrder, isCreating } = useCreateOrder();

  const selectedZone = watch("zone");

  // Disable Button
  const formValues = watch();
  const { additionalInfo, ...requiredFields } = formValues;
  const isDisabled = Object.values(requiredFields).some((ele) => !ele);

  const orderPrice = useMemo(
    () =>
      getCart?.reduce(
        (acc: number, item: CartItemLocalStorage) =>
          acc + ceilPrice(item.price * item.quantity),
        0
      ) ?? 0,
    [getCart]
  );

  const delivieryPrice = useMemo(
    () => zonesWithPrices.find((z) => z.label === selectedZone)?.price ?? 0,
    [selectedZone]
  );

  const totalPrice = orderPrice + delivieryPrice;

  const productData = useMemo(
    () =>
      getCart?.map((item: CartItemLocalStorage) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })) ?? [],
    [getCart]
  );

  const onSubmit = (data: CustomerInfo) => {
    const orderData: Order = {
      ...data,
      orderItem: productData,
      orderPrice,
      delivieryPrice,
      totalPrice,
    };

    createOrder(orderData, {
      onSuccess: () => {
        setIsOpen(false);
        navigate("/thankyou");
      },
    });
  };

  if (isGetting) return <Spinner />;

  if (getCart?.length === 0) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">السلة فارغة!</h2>
        <p className="text-muted-foreground mb-4 text-xl">أضف منتجات أولاً</p>
        <Link to="/products">
          <Button
            aria-label="Go to products page"
            size="lg"
            className="font-bold text-lg"
          >
            <ShoppingBag className="w-5 h-5" /> تصفح المنتجات
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-70px)] p-4 flex justify-center">
      <div className="lg:container w-full">
        <h1 className="text-3xl font-bold mb-4">تأكيد الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-4">
          <Cart orderPrice={orderPrice} delivieryPrice={delivieryPrice} />

          <div className="bg-white p-4 rounded-lg shadow-md border">
            <h2 className="text-lg font-semibold mb-2 pb-2 border-b">
              بيانات العميل
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="space-y-1">
                <label>الأسم كامل</label>
                <Input
                  {...register("fullName")}
                  placeholder="اكتب اسمك الكامل"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label>البريد الإلكتروني</label>
                <Input
                  {...register("email")}
                  placeholder="اكتب بريدك الإلكتروني"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label>رقم الهاتف</label>
                <Input
                  {...register("phoneNumber")}
                  placeholder="اكتب رقم الهاتف"
                />
              </div>

              {/* Address + Zone */}
              <div className="flex gap-3">
                <div className="basis-3/4 space-y-1">
                  <label>العنوان</label>
                  <Input
                    {...register("address")}
                    placeholder="اكتب عنوانك بالتفصيل"
                  />
                </div>

                <div className="basis-1/4 space-y-1">
                  <label>المنطقة</label>
                  <Controller
                    control={control}
                    name="zone"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المنطقة" />
                        </SelectTrigger>
                        <SelectContent>
                          {zonesWithPrices.map((z) => (
                            <SelectItem key={z.zone} value={z.label}>
                              {z.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-1">
                <label>معلومات إضافية</label>
                <Textarea
                  {...register("additionalInfo")}
                  rows={3}
                  placeholder="أي ملاحظات إضافية (اختياري)"
                />
              </div>

              {/* Buttons */}
              <div className="w-full flex justify-end">
                <Button
                  type="button"
                  aria-label="Confirm order"
                  className="w-full md:w-40 font-semibold"
                  onClick={() => setIsOpen(true)}
                  disabled={isDisabled}
                >
                  تأكيد الطلب
                </Button>

                <ConfirmButton
                  isOpen={isOpen}
                  isCreating={isCreating}
                  setIsOpen={setIsOpen}
                  onConfirm={handleSubmit(onSubmit)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
