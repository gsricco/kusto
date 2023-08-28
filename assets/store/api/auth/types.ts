export type RegistrationType = {
  email: string
  login: string
  password: string
}
export type LoginType = {
  email: string
  password: string
}
export type SendLinkType = {
  email: string
  recaptchaValue: string | null | undefined
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string[] | string | undefined
}
export type CheckLinkType = string[] | string | undefined

export type NewPasswordResType = {
  data: {
    errorsMessages: {
      field: string
      message: string
    }[]
  }
  status: number
}
export type LoginResponseType = {
  accessToken: string
  profile: boolean
}

type ErrorMessagesType = {
  field: string
  message: string
}

export type RegistrationResponseError = {
  data: {
    errorsMessages: ErrorMessagesType[]
  }
  status: number
}

export type MeType = {
  email: string
  id: string
  login: string
}
