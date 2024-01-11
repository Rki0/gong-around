// reference
// https://dev.to/this-is-learning/react-query-authentication-flow-id2

import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { QUERY_KEY } from "./queryKey";
import { AuthContext } from "@/context/authContext";
import tokenLocalStorage from "@/utils/tokenLocalStorage";

interface LogInUserData {
  email: string;
  password: string;
}

interface LoggedInData {
  access_token: string;
  nickname: string;
  userId: string;
}

const logIn = async (userData: LogInUserData): Promise<LoggedInData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BACKEND}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    }
  );

  // SUGGEST: onError에서 처리하고 있으니까 여기서는 그냥 throw new Error를 하는게 낫지않나?
  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  const loggedInData = await response.json();

  return {
    nickname: loggedInData.nickname,
    userId: loggedInData.userId,
    access_token: loggedInData.access_token,
  };
};

const useLogInQuery = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authCtx = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: (userData: LogInUserData): Promise<LoggedInData> =>
      logIn(userData),
    onSuccess: (loggedInData) => {
      queryClient.setQueryData([QUERY_KEY.USER_INFO], {
        nickname: loggedInData.nickname,
        userId: loggedInData.userId,
      });
      tokenLocalStorage.setToken(loggedInData.access_token);
      authCtx.setIsLoggedIn(true);
      router.push("/");
    },
    onError: (error) => {
      return alert(error.message);
    },
  });

  return mutate;
};

export default useLogInQuery;
