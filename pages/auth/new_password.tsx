import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useLazyCheckRecoveryCodeQuery } from "store/api/auth/authApi"
import { useRouter } from "next/router"

const AuthCodeCheker = () => {
  const router = useRouter()
  const searcjParams = useSearchParams()
  const code = searcjParams.get("code")
  const [ triger, result ] = useLazyCheckRecoveryCodeQuery()
  useEffect(() => {
    if (result.error && (result.error as any).data.errorsMessages[0].message === "Incorrect confirmation code") {
      router.push('/invalid-verification-link')
    }
    // добавить редирект на страницу со сменой пароля
  }, [result.error])
useEffect(() => {
if (code) {
    triger(code);
}
}, [code])
  console.log(result)
  return null // TODO добавить лоадер
}

export default AuthCodeCheker
