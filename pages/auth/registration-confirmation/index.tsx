import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useCheckLinkHandlerMutation } from '../../../assets/store/api/auth/authApi'
import { Path } from '../../../common/enums/path'
import { codeCheckLink } from '../../../common/utils/codeCheckLink'

const CheckLink = () => {
  const { resultName: code } = codeCheckLink('code')
  // const [checkLinkHandler] = useLazyCheckLinkHandlerQuery()
  const [checkLinkHandler] = useCheckLinkHandlerMutation()
  const router = useRouter()

  useEffect(() => {
    checkLinkHandler({ confirmationCode: code })
      .unwrap()
      .then(() => {
        router.push(Path.REGISTRATION_SUCCESS).then(() => {})
      })
      .catch(() => {
        router.push(Path.REGISTRATION_ERROR).then(() => {})
      })
  }, [])

  return <div />
}

export default CheckLink
