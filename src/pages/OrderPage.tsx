import {
  Calendar,
  Mail,
  MapPin,
  NotebookIcon,
  Package,
  Phone,
  User,
  X,
} from "lucide-react";
import useGetSpecificOrder from "../featuers/orders/useGetSpecificOrder";
import { useParams } from "react-router-dom";
import { ceilPrice } from "../lib/utils";
import type { OrderItem } from "@/types";
import Spinner from "../components/Spinner";

const OrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { specificOrder, isGetting } = useGetSpecificOrder(orderId as string);

  if (isGetting) {
    return <Spinner />;
  }

  const date = new Date(specificOrder?.createdAt || "");

  return (
    <div className="bg-background">
      {specificOrder ? (
        <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4 w-full min-h-[calc(100vh-70px)] p-4">
          {/* Order details */}
          <div className="order-last flex flex-col gradient-card p-4 md:p-6 rounded-xl shadow-soft md:col-span-2 md:row-span-5 md:col-start-4 md:row-start-1">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              تفاصيل الطلب ({specificOrder.orderItem.length ?? 0})
            </h2>

            <div className="space-y-3 flex-1 max-h-[400px] overflow-y-auto p-4 pr-0">
              {specificOrder.orderItem.map((item: OrderItem) => (
                <div
                  key={item._id}
                  className="flex justify-between items-start p-3 bg-secondary/70 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {item.productId?.name ?? "منتج غير معروف"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity ?? 0} × {item.price ?? 0} ج.م
                    </p>
                  </div>
                  <p className="font-bold text-primary whitespace-nowrap mr-2">
                    {ceilPrice(item.quantity * item.price) ?? 0} ج.م
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">
                  {`${date.toLocaleDateString(
                    "ar-EG"
                  )}-${date.toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">مصاريف التوصيل:</span>{" "}
                <span className="font-bold text-primary">
                  {specificOrder.delivieryPrice ?? 0} ج.م
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">
                  المجموع الكلي:
                </span>
                <span className="text-2xl font-bold text-primary">
                  {specificOrder.totalPrice ?? 0} ج.م
                </span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="order-first gradient-card p-4 md:p-6 rounded-xl shadow-soft md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  تتبع الطلب
                </h1>
                <p className="text-muted-foreground">
                  رقم الطلب:{" "}
                  <span className="font-semibold text-foreground">
                    #{specificOrder._id}
                  </span>
                </p>
              </div>
            </div>
            {/* Status */}
            {specificOrder.orderState === "cancelled" && (
              <div className="flex items-center gap-3 bg-secondary/70 rounded-lg mb-4 p-3 shadow-sm">
                <X className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">
                    تم إلغاء هذا الطلب
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div className="gradient-card p-4 md:p-6 rounded-xl shadow-soft md:col-span-3 md:row-span-3 md:row-start-3">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              معلومات العميل
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">الاسم</p>
                  <p className="font-semibold text-foreground">
                    {specificOrder.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                  <p className="font-semibold text-foreground" dir="ltr">
                    {specificOrder.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    البريد الإلكتروني
                  </p>
                  <p className="font-semibold text-foreground break-all">
                    {specificOrder.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">العنوان</p>
                  <p className="font-semibold text-foreground">
                    {specificOrder.address ?? "غير محدد"} - {specificOrder.zone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <NotebookIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">ملاحظات</p>
                  <p className="font-semibold text-foreground">
                    {specificOrder.additionalInfo || "لا يوجد ملاحظات"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-2xl sm:text-4xl">لا يوجد طلب حاليا</h1>
      )}
    </div>
  );
};

export default OrderPage;
