import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItemLocalStorage } from "../../types/index";

const useAddCart = () => {
  const queryClient = useQueryClient();
  const { mutate: addCart, isPending: isAdding } = useMutation({
    mutationFn: (data: CartItemLocalStorage) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find(
        (item: CartItemLocalStorage) => item._id === data._id
      );
      if (existingItem) {
        existingItem.quantity += data.quantity;
      } else {
        cart.push(data);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.log("Product failed:", err);
    },
  });

  return { addCart, isAdding };
};

export default useAddCart;
