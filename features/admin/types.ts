import {
  Maybe,
  Profile,
  SubscriptionPaymentsModel,
  UserBan,
  UsersQuery,
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
  users: UsersQuery | undefined
}

export type PaymentsTableType = {
  payments: SubscriptionPaymentsModel | undefined
  selectedSort: (sortType: string) => void
}

export type Filtredusers = {
  __typename?: 'User'
  createdAt: string
  email: string
  id: number
  profile: Profile
  userBan?: Maybe<UserBan>
  userName: string
}
