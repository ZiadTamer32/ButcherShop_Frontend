import { getErrorsMessage } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useChangeState = () => {
  const queryClient = useQueryClient();
  const { mutate: changeState, isPending: isChanging } = useMutation({
    mutationFn: async ({ state, id }: { state: string; id: string }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/orders/change-order-state/${id}`,
        { state },
        { withCredentials: true }
      );
      return res.data;
    },
    onError: (err) => {
      getErrorsMessage(err);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getOrders"] });
      toast.success("تم تغيير حالة الطلب بنجاح");
    },
  });
  return { changeState, isChanging };
};

export default useChangeState;
