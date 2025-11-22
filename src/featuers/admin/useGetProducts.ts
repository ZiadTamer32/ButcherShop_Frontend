import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetProducts = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/all`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return { products, isPending };
};

export default useGetProducts;
