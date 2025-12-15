import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../../../api/api.auth";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading: authUser?.isLoading,
    authUser: authUser?.data?.user,
    error: authUser?.error,
  };
};

export default useAuthUser;
