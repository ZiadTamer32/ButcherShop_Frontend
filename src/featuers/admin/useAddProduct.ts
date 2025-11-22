import { getErrorsMessage } from "../../lib/utils";
import type { Product } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: async (data: Product) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("category", data.category);
      if (data.image instanceof File) formData.append("image", data.image);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/add-product`,
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
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("تم إضافة المنتج بنجاح");
    },
  });

  return { addProduct, isAdding };
};

export default useAddProduct;
