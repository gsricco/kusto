import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "common/hooks";
import { isAppInitializedSelector } from "assets/store/app.selector";
import { Path } from "common/enums/path";

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const isAppInitialized = useAppSelector(isAppInitializedSelector);

  // const isAuth = true  // запрос авторизации
  useEffect(() => {
    if (!isAppInitialized) router.push(Path.LOGIN);
  }, [isAppInitialized]);

  return <>{children}</>;
};
