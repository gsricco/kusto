export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type LoginType = {
  loginOrEmail: string
  password: string
}
export type SendLinkType = {
  email: string
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string}

export type LoginResponseType = {
  accessToken: string
}

export type ProfileType = {
  username: string
  firstname: string
  lastname: string
  birthday: string
  city: string
  aboutMe: string
}
