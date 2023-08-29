import { FC, PropsWithChildren, useEffect } from 'react'

import { Path } from 'common/enums/path'
import { useRouter } from 'next/router'

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter()
  // const isAuthInitialized = useAppSelector(isAppInitializedSelector);

  // useEffect(() => {
  //         if (!isAuthInitialized) {
  //       router.push(Path.LOGIN);
  //       console.log("REDIRECT, isAuthInitialized =", isAuthInitialized);
  //     }

  // }, []);

  return <>{children}</>
}
