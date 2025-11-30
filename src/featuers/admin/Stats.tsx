/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DollarSign,
  Package,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

import StatCard from "./StatCard";
import useGetOrders from "./useGetOrders";
import useGetProducts from "./useGetProducts";
import type { Order, OrderItem } from "../../types";
import { useMemo } from "react";

interface ProductSale {
  productId: {
    _id: string;
    name: string;
  };
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface StatsType {
  totalOrders: number;
  totalProducts: number;
  netRevenue: number;
  topProduct?: string;
  topRevenue?: number;
}

const Stats = () => {
  const { orders = [], isPending: isGetOrder } = useGetOrders();
  const { products, isPending: isGetProducts } = useGetProducts();

  const stats: StatsType = useMemo(() => {
    // 1) إجمالي الطلبات + الإيرادات
    const validOrders = orders.filter(
      (o: Order) => o.orderState !== "cancelled"
    );

    const netRevenue = validOrders.reduce(
      (sum: number, o: Order) => sum + (o.totalPrice || 0),
      0
    );

    // 2) حساب المنتجات الأكثر مبيعًا
    const productSales = validOrders
      .flatMap((order: Order) => order.orderItem || [])
      .reduce((acc: ProductSale[], item: OrderItem) => {
        const existing = acc.find(
          (p) => p.productId._id === item.productId._id
        );

        if (existing) {
          existing.totalQuantity += item.quantity;
          existing.totalRevenue += item.price * item.quantity;
        } else {
          acc.push({
            productId: item.productId,
            productName: item.productId?.name,
            totalQuantity: item.quantity,
            totalRevenue: item.price * item.quantity,
          });
        }
        return acc;
      }, []);

    const sorted = productSales.sort(
      (a: any, b: any) => b.totalRevenue - a.totalRevenue
    );

    return {
      totalOrders: orders.length ?? 0,
      totalProducts: products?.data?.data?.length ?? 0,
      netRevenue,
      topProduct: sorted?.[0]?.productName,
      topRevenue: sorted?.[0]?.totalRevenue,
    };
  }, [orders, products]);

  console.log(orders);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard
        title="إجمالي الطلبات"
        value={stats.totalOrders}
        icon={ShoppingCart}
        isLoading={isGetOrder}
      />

      <StatCard
        title="إجمالي المنتجات"
        value={stats.totalProducts}
        icon={Package}
        isLoading={isGetProducts}
      />

      <StatCard
        title="إجمالي الإيرادات"
        value={`${stats.netRevenue.toLocaleString()} ج.م`}
        icon={DollarSign}
        isLoading={isGetOrder}
      />

      <StatCard
        title="الأكثر مبيعاً"
        value={stats.topProduct || "لا يوجد"}
        revenue={stats.topRevenue}
        icon={UtensilsCrossed}
        isLoading={isGetOrder}
      />
    </div>
  );
};

export default Stats;
