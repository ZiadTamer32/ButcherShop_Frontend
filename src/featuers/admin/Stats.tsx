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
import type { Order } from "../../types/index";

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
}

const Stats = () => {
  const { orders = [], isPending: isGetOrder } = useGetOrders();
  const { products, isPending: isGetProducts } = useGetProducts();

  // Stats section
  const stats: StatsType = {
    totalOrders: orders.length,
    totalProducts: products?.data?.data?.length ?? 0,
    netRevenue: orders.reduce((sum: number, o: Order) => sum + o.totalPrice, 0),
  };

  // Top selling products
  const productSales: ProductSale[] =
    orders
      ?.flatMap((order: any) => order.orderItem)
      ?.reduce((acc: ProductSale[], item: any) => {
        const existing = acc.find(
          (p) => p.productId._id === item.productId._id
        );
        if (existing) {
          existing.totalQuantity += item.quantity;
          existing.totalRevenue += item.price * item.quantity;
        } else {
          acc.push({
            productId: item.productId,
            productName: item.productId.name,
            totalQuantity: item.quantity,
            totalRevenue: item.price * item.quantity,
          });
        }
        return acc;
      }, []) ?? [];

  const topProduct = productSales
    ?.sort((a, b) => b.totalRevenue - a.totalRevenue)
    ?.slice(0, 1)?.[0]?.productName;
  const topRevenue = productSales
    ?.sort((a, b) => b.totalRevenue - a.totalRevenue)
    ?.slice(0, 1)?.[0]?.totalRevenue;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard
        title="إجمالي الطلبات"
        value={stats.totalOrders || 0}
        icon={ShoppingCart}
        color="blue"
        isLoading={isGetOrder}
      />

      <StatCard
        title="إجمالي المنتجات"
        value={stats.totalProducts || 0}
        icon={Package}
        color="red"
        isLoading={isGetProducts}
      />

      <StatCard
        title="إجمالي الإيرادات"
        value={`${stats.netRevenue.toLocaleString() || 0} ج.م`}
        icon={DollarSign}
        color="green"
        isLoading={isGetOrder}
      />

      <StatCard
        title="الأكثر مبيعاً"
        value={topProduct || "لا يوجد"}
        revenue={topRevenue}
        icon={UtensilsCrossed}
        color="indigo"
        isLoading={isGetOrder}
      />
    </div>
  );
};

export default Stats;
