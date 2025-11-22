import { Package } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../../components/ui/drawer";
import type { Order } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { memo, useMemo } from "react";
const AllOrdersByUser = ({
  isDrawerOpen,
  setIsDrawerOpen,
  orders,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orders: Order[];
}) => {
  const navigate = useNavigate();
  const reversedOrders = useMemo(() => {
    return [...orders]?.reverse();
  }, [orders]);
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-start mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-primary" />
            </div>
          </div>
          <DrawerTitle className="text-2xl text-right">طلباتي</DrawerTitle>
          <DrawerDescription className="text-right">
            لديك {orders?.length} {orders?.length === 1 ? "طلب" : "طلبات"}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto" dir="ltr">
          <div className="space-y-3" dir="rtl">
            {orders?.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
              </div>
            ) : (
              reversedOrders?.map((order: Order) => {
                return (
                  <div
                    key={order._id}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate(`/order/${order._id}`);
                    }}
                    className="gradient-card p-4 rounded-lg shadow-md border-2 border-border cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-foreground">
                          طلب #{order._id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt ?? "").toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-primary text-base">
                        {order.totalPrice ?? 0} ج.م
                      </span>
                      {order.orderState === "cancelled" && (
                        <span className="bg-primary text-primary-foreground py-1.5 px-3 rounded-full font-semibold text-xs">
                          ملغي
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                      {order.orderItem.length}{" "}
                      {order.orderItem.length === 1 ? "منتج" : "منتجات"}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <DrawerFooter className="px-4 pb-6">
          <Button
            onClick={() => setIsDrawerOpen(false)}
            variant="outline"
            className="w-full"
          >
            إغلاق
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default memo(AllOrdersByUser);
