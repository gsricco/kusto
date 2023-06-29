export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type LoginType = {
  loginOrEmail: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
}
