import { getErrorsMessage } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (productID: string) => {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/hard-delete-product/${productID}`,
        { withCredentials: true }
      );
      return res.data;
    },

    onError: (err) => {
      toast.error(getErrorsMessage(err));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("تم حذف المنتج بنجاح");
    },
  });

  return { deleteProduct, isDeleting };
};

export default useDeleteProduct;
