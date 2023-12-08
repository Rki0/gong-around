import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/query/queryKey";

interface User {
  access_token: string;
}

const useUser = () => {
  const { data: user } = useQuery<User>({
    queryKey: [QUERY_KEY.USER_INFO],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: Infinity,
  });

  return {
    user,
  };
};

export default useUser;
