export type MenuPropsType = {
  ban: boolean
  id: string
  userName: string
}

export type ArrowsPropsType = {
  sortDirection: boolean | undefined
}

export type Filtredusers = {
  __typename?: 'UserModel' | undefined
  accountType: string
  ban: boolean
  createdAt: string
  email: string
  id: string
  login: string
}

export type TablePropsType = {
  selectedSort: (sortType: string) => void
  users: Filtredusers[] | undefined
}
