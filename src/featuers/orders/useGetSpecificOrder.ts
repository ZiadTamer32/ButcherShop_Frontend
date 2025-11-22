import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetSpecificOrder = (orderId: string) => {
  const {
    data: specificOrder,
    isPending: isGetting,
    error,
  } = useQuery({
    queryKey: ["getSpecificOrder", orderId],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/orders/get-user-specific-order/${orderId}`,
        { withCredentials: true }
      );

      return res?.data?.data?.data;
    },
    enabled: !!orderId,
    retry: false,
  });

  return { specificOrder, isGetting, error };
};

export default useGetSpecificOrder;
