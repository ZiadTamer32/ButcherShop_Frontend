import { getErrorsMessage } from "../../lib/utils";
import type { Product } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useEditProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isPending: isEditing } = useMutation({
    mutationFn: async (data: Product) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("category", data.category);
      formData.append("isAvailable", String(data.isAvailable));
      if (data.image instanceof File) formData.append("image", data.image);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/update-product/${data._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
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
      toast.success("تم تحديث المنتج بنجاح");
    },
  });

  return { editProduct, isEditing };
};

export default useEditProduct;
