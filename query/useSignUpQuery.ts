import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

interface SignUpUserData {
  nickname: string;
  email: string;
  password: string;
}

const signUp = async (userData: SignUpUserData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BACKEND}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    return alert("회원가입 실패");
  }
};

const useSignUpQuery = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (userData: SignUpUserData) => signUp(userData),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다. 로그인 창으로 이동합니다.");
      router.push("/login");
    },
    onError: () => {
      alert("회원가입 실패");
    },
  });

  return mutate;
};

export default useSignUpQuery;
