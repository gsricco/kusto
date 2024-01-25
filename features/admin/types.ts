import {
  Maybe,
  Profile,
  Query,
  Scalars,
  SubscriptionPaymentsModel,
  UserBan,
} from '../../assets/apollo/__generated__/graphql'

export type MenuPropsType = {
  ban: boolean
  id: string
  userName: string
}

export type ArrowsPropsType = {
  sortDirection: boolean | undefined
}

export type TablePropsType = {
  selectedSort: (sortType: string) => void
  users: Query | undefined
}

export type PaymentsTableType = {
  payments: SubscriptionPaymentsModel | undefined
  selectedSort: (sortType: string) => void
}

export type Filtredusers = {
  // __typename?: 'UserModel' | undefined
  // accountType: string
  // ban: boolean
  // createdAt: string
  // email: string
  // id: string
  // login: string
  __typename?: 'User'
  createdAt: string
  email: string
  id: number
  profile: Profile
  userBan?: Maybe<UserBan>
  userName: string
}
