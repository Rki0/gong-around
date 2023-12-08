import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { QUERY_KEY } from "./queryKey";
import { AuthContext } from "@/context/authContext";
import tokenLocalStorage from "@/utils/tokenLocalStorage";

interface UserData {
  access_token: string;
  nickname: string;
  userId: string;
}

const logOut = async (userId: string) => {
  if (!userId) {
    return;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BACKEND}/auth/logout`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("로그아웃 실패");
  }
};

const useLogOutQuery = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authCtx = useContext(AuthContext);

  const userData = queryClient.getQueryData(["userInfo"]) as UserData;

  const { mutate } = useMutation({
    mutationFn: () => logOut(userData.userId),
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.USER_INFO], null);
      tokenLocalStorage.removeToken();
      authCtx.setIsLoggedIn(false);
      router.push("/");
    },
    onError: (error) => {
      return alert(error.message);
    },
  });

  return mutate;
};

export default useLogOutQuery;
