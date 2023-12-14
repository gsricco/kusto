export type RegistrationType = {
  email: string
  password: string
  userName: string
}
export type LoginType = {
  email: string
  password: string
}
export type SendLinkType = {
  email: string
  recaptcha: string | null
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string[] | string | undefined
}
// export type CheckLinkType = string[] | string | undefined
export type CheckLinkType = {
  confirmationCode: string
}

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
  // profile: boolean
}

type ErrorMessagesType = {
  field: string
  message: string
}

export type RegistrationResponseError = {
  data: {
    error: string
    messages: ErrorMessagesType[]
    statusCode: number
  }
}

export type MeType = {
  email: string
  userId: number
  userName: string
}

export type RefreshLinkType = {
  baseUrl: string
  email: string
}

export type NotAuthorization = {
  error: {
    data: string
    error: string
    originalStatus: number
    status: string
  }
}

export type RefreshTokenResponse = {
  data: {
    accessToken: string
  }
}
