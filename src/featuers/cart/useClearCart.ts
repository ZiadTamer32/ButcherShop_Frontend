import { useMutation, useQueryClient } from "@tanstack/react-query";

const useClearCart = () => {
  const queryClient = useQueryClient();
  const { mutate: clearCart, isPending: isClearing } = useMutation({
    mutationFn: async function () {
      localStorage.removeItem("cart");
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.log("Product failed:", err);
    },
  });
  return { clearCart, isClearing };
};

export default useClearCart;
