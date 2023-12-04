export type UserType = {
  city: string
  dateOfBirthday: string
  firstName: string
  lastName: string
  login: string
  photo?: string
  userId?: string
  userInfo?: string
}

export type AvatarType = {
  avatar: string
  formData: FormData
}

export type AuthMeType = {
  email: string
  // email: string
  // id: string
  // login: string
  userId: number
  userName: string
}

export type SaveProfileInfoType = {
  city: string
  dateOfBirthday: string
  firstName: string
  lastName: string
  login: string
  userInfo: string
}
