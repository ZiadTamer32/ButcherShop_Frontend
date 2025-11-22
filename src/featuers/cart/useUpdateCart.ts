import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItemLocalStorage } from "../../types/index";

const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCart, isPending: isUpdating } = useMutation({
    mutationFn: (data: CartItemLocalStorage) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find(
        (item: CartItemLocalStorage) => item._id === data._id
      );
      if (existingItem) {
        existingItem.quantity = data.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.log("Product failed:", err);
    },
  });

  return { updateCart, isUpdating };
};

export default useUpdateCart;
