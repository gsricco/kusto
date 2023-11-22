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
  recaptcha: string | null | undefined
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string
}
export type CheckLinkType = {
  recoveryCode: string
}

export type CheckLinkResType = {
  email: string
}
// export type NewPasswordResType = {
//   data: {
//     errorsMessages: {
//       field: string
//       message: string
//     }[]
//   }
//   status: number
// }
export type LoginResponseType = {
  accessToken: string
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
