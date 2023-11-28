import { useEffect, ReactNode } from 'react'

import { Path } from 'common/enums/path'
import { useAuth } from 'common/hooks/useAuth'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const canActivate = useAuth()
  const router = useRouter()

  const { data, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated' && !canActivate) {
      signIn()
    }

    if (!canActivate) {
      router.push(Path.LOGIN)
    }
  }, [canActivate, status])

  return <div>{children}</div>
}

export default PrivateRoute
