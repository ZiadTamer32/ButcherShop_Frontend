import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetOrders = (
  page = 1,
  filter = "all",
  limit: number | string = "all"
) => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["getOrders", page, filter, limit],
    queryFn: async ({ queryKey }) => {
      const [, page, filter, limit] = queryKey;

      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/orders/get-all-orders?page=${page}&filter=${filter}&limit=${limit}`,
        { withCredentials: true }
      );

      return res?.data?.orders;
    },
    // refetchInterval: 5 * 60 * 1000, // كل 5 دقائق
  });

  return { orders, isPending };
};

export default useGetOrders;
