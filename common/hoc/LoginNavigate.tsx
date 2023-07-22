import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAuthMeQuery } from "assets/store/api/profile/profileApi";

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { isSuccess } = useAuthMeQuery();

  const isAuth = true; // запрос авторизации  useSelector(state => state.auth.isAuth)

  if (!isAuth) router.push("/auth/login");

  return <>{children}</>;
};
