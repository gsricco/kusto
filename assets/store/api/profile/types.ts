export type UserType = {
  id: number
  city: string
  dateOfBirthday: string
  firstName: string
  lastName: string
  login: string
  photo?: string
  userId?: string
  userInfo?: string
}
export type UserProfileType = {
  aboutMe?: string
  avatars: AvatarUserType[]
  city?: string
  createdAt: string
  dateOfBirth?: string
  firstName?: string
  id: number
  lastName?: string
  userName: string
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
export type AvatarUserType = {
  fileSize: number
  height: number
  url: string
  width: number
}
