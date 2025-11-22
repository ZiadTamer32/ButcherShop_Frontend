import { useQuery } from "@tanstack/react-query";

const useGetCart = () => {
  const { data: getCart, isPending: isGetting } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      return cart;
    },
  });
  return { getCart, isGetting };
};

export default useGetCart;
