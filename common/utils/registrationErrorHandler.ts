import { RegistrationResponseError } from 'assets/store/api/auth/types'
import { SetFieldErrorType } from 'common/components/Formik/types'
import { TFunction } from 'i18next'

export const registrationErrorHandler = (
  error: RegistrationResponseError,
  t: TFunction<'translation', undefined>,
  { setFieldError }: SetFieldErrorType
): void => {
  console.log(error)
  if ('data' in error) {
    const { messages } = error.data

    messages.forEach(({ message, field }) => {
      let tMessage = ''

      switch (message) {
        case 'Invalid email':
          tMessage = t('invalid_email')
          break
        case 'User with this email is already exist':
          tMessage = t('email_err')
          break
        case 'User with this userName is already exist':
          tMessage = t('user_err')
          break
        default:
          tMessage = t('some_err')
      }
      console.log(field, tMessage)
      setFieldError(field, tMessage)
    })
  }
}
