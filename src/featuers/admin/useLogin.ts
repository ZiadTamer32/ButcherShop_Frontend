import { getErrorsMessage } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/signIn`,
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    onError: (err) => {
      toast.error(getErrorsMessage(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("تم تسجيل الدخول بنجاح");
    },
  });

  return { login, isPending };
};

export default useLogin;
