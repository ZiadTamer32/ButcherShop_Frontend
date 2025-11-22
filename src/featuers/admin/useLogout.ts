import { getErrorsMessage } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/logOut`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("تم تسجيل الخروج بنجاح");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(getErrorsMessage(err) || "حدث خطأ أثناء تسجيل الخروج");
    },
  });
  return { logout, isLoggingOut };
};
export default useLogout;
