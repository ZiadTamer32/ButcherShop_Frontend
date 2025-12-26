import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ceilPrice, sliceText } from "../../lib/utils";
import type { Order, OrderItem } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useSearchParams } from "react-router-dom";
import useGetOrders from "./useGetOrders";
import useChangeState from "./useChangeState";

const AllOrders = () => {
  const { changeState, isChanging } = useChangeState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page") || 1)
  );
  const [categoryFilter, setCategoryFilter] = useState<string>(
    searchParams.get("category") || "all"
  );
  const { orders, isPending } = useGetOrders(page, categoryFilter, 10);

  const categoryArray = [
    { value: "all", label: "الكل" },
    { value: "new", label: "جديد" },
    { value: "seen", label: "تمت المشاهدة" },
    { value: "cancelled", label: "ملغي" },
  ];

  const handleNextPage = () => {
    if (orders.length < 10) return;
    setPage((prev) => prev + 1);
    setSearchParams({
      tab: "orders",
      category: categoryFilter,
      page: (page + 1).toString(),
      duration: searchParams.get("duration") || "month",
    });
  };
  const handlePrevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    setSearchParams({
      tab: "orders",
      category: categoryFilter,
      page: (page - 1).toString(),
      duration: searchParams.get("duration") || "month",
    });
  };
  const handleSelectCategory = (value: string) => {
    setCategoryFilter(value);
    setPage(1);
    setSearchParams({
      tab: "orders",
      category: value,
      page: "1",
      duration: searchParams.get("duration") || "month",
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center my-24">
        <Loader className="animate-spin size-16 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="my-4 font-bold text-2xl">جميع الطلبات</h2>

        <Select value={categoryFilter} onValueChange={handleSelectCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الكل" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>التصنيف</SelectLabel>
              {categoryArray.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* All Orders */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders?.map((order: Order) => (
            <div
              key={order._id}
              className="gradient-card p-6 rounded-xl shadow-soft relative"
            >
              {/* Order State Badge */}
              {order.orderState === "new" && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                  جديد
                </span>
              )}
              {order.orderState === "seen" && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                  تمت المشاهدة
                </span>
              )}
              {order.orderState === "cancelled" && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-white rounded-full text-sm">
                  ملغي
                </span>
              )}

              {/*  Select الحالة  */}
              <div className="flex justify-between items-center mb-6 mt-6">
                <h3 className="text-xl font-bold">تغيير الحالة</h3>

                <Select
                  value={order.orderState}
                  onValueChange={(value) =>
                    changeState({ state: value, id: order._id as string })
                  }
                  disabled={isChanging}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="seen">تمت المشاهدة</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-xl font-bold mb-4">بيانات العميل</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <span className="font-semibold text-foreground">
                        الاسم:
                      </span>{" "}
                      {order.fullName}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        البريد:
                      </span>{" "}
                      {order.email}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        الهاتف:
                      </span>{" "}
                      {order.phoneNumber}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        العنوان:
                      </span>{" "}
                      {order.address}-{order.zone}
                    </p>
                    {order.additionalInfo && (
                      <p>
                        <span className="font-semibold text-foreground">
                          ملاحظات:
                        </span>{" "}
                        {order.additionalInfo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    تفاصيل الطلب
                  </h3>
                  <div className="space-y-2">
                    {order?.orderItem?.map((item: OrderItem) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center p-3 bg-secondary/70 rounded-lg"
                      >
                        <span className="font-semibold text-sm sm:text-lg">
                          {sliceText(item?.productId?.name)}
                        </span>
                        <span className="text-muted-foreground text-sm sm:text-lg">
                          {item.quantity} كجم × {item.price} ج.م
                        </span>
                        <span className="font-bold text-primary text-sm sm:text-lg">
                          {ceilPrice(item.quantity * item.price)} ج.م
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-2 sm:gap-0 sm:flex-row flex-col justify-between items-start sm:items-center pt-6 border-t border-border">
                <div className="text-muted-foreground">
                  <span className="font-semibold">تاريخ الطلب:</span>{" "}
                  {`${new Date(order.createdAt ?? "").toLocaleDateString(
                    "ar-EG"
                  )} - ${new Date(order.createdAt ?? "").toLocaleTimeString(
                    "ar-EG",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}`}
                </div>

                {/* <div className="text-right space-y-1"> */}
                {/* <div>
                    <span className="font-semibold">مصاريف التوصيل:</span>{" "}
                    <span className="font-bold text-primary">
                      {order.delivieryPrice} ج.م
                    </span>
                  </div> */}

                <div className="text-2xl font-bold">
                  <span className="text-foreground">المجموع:</span>{" "}
                  <span className="text-primary">{order.totalPrice} ج.م</span>
                </div>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-24 text-muted-foreground text-xl">
          لا توجد طلبات حالياً
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handleNextPage}
          disabled={!orders || orders.length < 10}
        >
          التالي
        </Button>
        <Button onClick={handlePrevPage} disabled={page === 1}>
          السابق
        </Button>
      </div>
    </div>
  );
};

export default AllOrders;
