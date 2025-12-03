import {
  DollarSign,
  Package,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { subMonths, subQuarters, isWithinInterval } from "date-fns";

import StatCard from "./StatCard";
import useGetOrders from "./useGetOrders";
import useGetProducts from "./useGetProducts";
import type { Order, OrderItem } from "../../types";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

type Duration = "month" | "quarter" | "double-quarter";

const filterDataByTime = (data: Order[], timePeriod: string): Order[] => {
  if (!data || data.length === 0) return [];

  const now = new Date();
  let startDate: Date;

  switch (timePeriod) {
    case "month":
      startDate = subMonths(now, 1);
      break;
    case "quarter":
      startDate = subQuarters(now, 1);
      break;
    case "double-quarter":
      startDate = subQuarters(now, 2);
      break;
    default:
      startDate = subMonths(now, 1);
  }

  return data.filter((item: Order) => {
    if (!item?.createdAt) return false;
    const itemDate = new Date(item.createdAt);
    return isWithinInterval(itemDate, { start: startDate, end: now });
  });
};

const Stats = () => {
  const { orders = [], isPending: isGetOrder } = useGetOrders();
  const { products, isPending: isGetProducts } = useGetProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  // Safe initialization with type guard
  const [duration, setDuration] = useState<Duration>(
    (searchParams.get("duration") as Duration) || "month"
  );

  // Memoize filtered data separately for better performance
  const filteredData = useMemo(
    () => filterDataByTime(orders, duration),
    [orders, duration]
  );

  const stats: StatsType = useMemo(() => {
    // 1) Filter valid orders (non-cancelled)
    const validOrders = filteredData.filter(
      (o: Order) => o.orderState !== "cancelled"
    );

    // 2) Calculate total revenue
    const netRevenue = validOrders.reduce(
      (sum: number, o: Order) => sum + (o.totalPrice || 0),
      0
    );

    // 3) Calculate top-selling products
    const productSales = validOrders
      .flatMap((order: Order) => order.orderItem || [])
      .reduce<ProductSale[]>((acc, item: OrderItem) => {
        // Add null safety check for productId
        if (!item.productId?._id) return acc;

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
      }, []);

    // Sort by revenue (create new array to avoid mutation)
    const sorted = [...productSales].sort(
      (a, b) => b.totalRevenue - a.totalRevenue
    );

    return {
      totalOrders: filteredData.length ?? 0,
      totalProducts: products?.data?.data?.length ?? 0,
      netRevenue,
      topProduct: sorted[0]?.productName,
      topRevenue: sorted[0]?.totalRevenue,
    };
  }, [filteredData, products]);

  const handleSelectDuration = (value: Duration) => {
    setDuration(value);
    setSearchParams({
      duration: value,
      page: searchParams.get("page") || "1",
      tab: searchParams.get("tab") || "products",
      category: searchParams.get("category") || "all",
    });
  };

  return (
    <>
      <Select value={duration} onValueChange={handleSelectDuration}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="شهر" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>المدة</SelectLabel>
            <SelectItem value="month">شهر</SelectItem>
            <SelectItem value="quarter">ثلاثة أشهر</SelectItem>
            <SelectItem value="double-quarter">ستة أشهر</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 mb-8">
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
    </>
  );
};

export default Stats;
