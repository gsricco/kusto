import dayjs from 'dayjs'

export type UserType = {
  city: string
  dateOfBirthday: string
  firstName: string
  id: number
  lastName: string
  login: string
  photo?: string
  userId?: string
  userInfo?: string
}
export type UserProfileType = {
  [key: string]: AvatarUserType[] | number | string | undefined
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
  aboutMe: string
  city: string
  dateOfBirth: dayjs.Dayjs
  firstName: string
  lastName: string
  // city: string
  // dateOfBirthday: string
  // firstName: string
  // lastName: string
  // login: string
  // userInfo: string
  userName: string
}
export type AvatarUserType = {
  fileSize: number
  height: number
  url: string
  width: number
}
