import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllOrdersByUser = () => {
  const { data: getAllOrdersByUser, isPending: isGetting } = useQuery({
    queryKey: ["getAllOrdersByUser"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders/get-user-orders`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });
  return { getAllOrdersByUser, isGetting };
};
export default useGetAllOrdersByUser;
