import { Dispatch, SetStateAction } from 'react'

import { Query } from 'assets/apollo/__generated__/graphql'
import { Filtredusers } from 'features/admin/types'

export const filterByStatus = (
  selected: string,
  users: Query,
  setFn: Dispatch<SetStateAction<Filtredusers[] | []>>
): void => {
  if (users) {
    if (selected === 'Blocked') {
      const filtred = users.getUsers.users.filter(user => user.userBan)

      setFn(filtred)
    } else if (selected === 'Not Blocked') {
      const filtred = users.getUsers.users.filter(user => !user.userBan)

      setFn(filtred)
    } else {
      const filtred = users.getUsers.users

      setFn(filtred)
    }
  }
}
