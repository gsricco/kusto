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
  id: string
  login: string
}
