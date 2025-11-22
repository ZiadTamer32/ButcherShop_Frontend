import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/userAuth`,
        {
          withCredentials: true,
        }
      );
      // Simplify the returned structure for easier use in components
      return res?.data?.data?.data?.user?.decodedData?.email ?? null;
    },
    retry: false, // don’t retry auth checks
  });

  return { user, isPending };
};

export default useUser;
