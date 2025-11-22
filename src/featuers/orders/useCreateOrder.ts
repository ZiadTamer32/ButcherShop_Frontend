import { getErrorsMessage } from "../../lib/utils";
import type { Order } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: async (order: Order) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders/create-order`,
        order,
        { withCredentials: true }
      );
      return res.data;
    },
    onError: (err) => {
      toast.error(getErrorsMessage(err));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getAllOrdersByUser"],
        exact: true,
      });
      toast.success("تم إنشاء الطلب بنجاح");
    },
  });
  return { createOrder, isCreating };
};

export default useCreateOrder;
