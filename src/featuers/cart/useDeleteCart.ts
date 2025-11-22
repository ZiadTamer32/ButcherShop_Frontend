import type { CartItemLocalStorage } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCart, isPending: isDeletingCart } = useMutation({
    mutationFn: (productId: string) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.filter(
        (item: CartItemLocalStorage) => item._id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم حذف المنتج من السلة بنجاح");
    },
    onError: (err) => {
      console.log("Product failed:", err);
    },
  });

  return { deleteCart, isDeletingCart };
};

export default useDeleteCart;
