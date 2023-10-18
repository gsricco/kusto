import { useState } from 'react'

import { TFunction } from 'i18next'

import { UsersQuery } from '../../../../assets/apollo/__generated__/graphql'

import block from '../../../../public/img/icons/block_outline.svg'
import down from '../../../../public/img/icons/sort_down.svg'
import up from '../../../../public/img/icons/sort_up.svg'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from '../../../../styles/styledComponents/payments/payments.styled'
import { dateParser } from '../../../utils/dateParser'

import {
  Block,
  EmptyBlock,
  HeadingWithSort,
  MenuCell,
  SelectSortDirection,
  Sort,
  Text,
} from './UsersTable.styled'
import { UsersTableMenu } from './UsersTableMenu'

type TableProps = {
  t: TFunction<'translation', undefined>
  users: UsersQuery | undefined
}

const UsersTable = ({ t, users }: TableProps) => {
  const tableHeadingData = ['User ID', 'Username', 'Profile Link', 'Date Added', '']
  const [sortDirection, setSortDirection] = useState<boolean | null>(null)
  const [sortedColumn, setSortedColumn] = useState<string | null>(null)

  const toggleSortDirection = (name: string) => {
    console.log(name)
    setSortedColumn(name)
  }

  const sortedUsers = users?.users
    ? [...users.users].sort((a, b) => {
        if (sortedColumn === 'Username') {
          return sortDirection ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login)
        }
        if (sortedColumn === 'Date Added') {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()

          return sortDirection ? dateA - dateB : dateB - dateA
        }

        return 0
      })
    : []

  const handleSortUsersUp = () => {
    setSortDirection(true)
  }
  const handleSortUsersUDown = () => {
    setSortDirection(false)
  }

  return (
    <Table style={{ maxWidth: '1024px', width: '100%' }}>
      <TableHeading>
        {tableHeadingData.map((name, index) => {
          return index % 2 ? (
            <HeadingWithSort key={name} onClick={() => toggleSortDirection(name)}>
              <p>{name}</p>
              <Sort>
                <SelectSortDirection alt="arrow" src={up} onClick={handleSortUsersUp} />
                <SelectSortDirection alt="arrow" src={down} onClick={handleSortUsersUDown} />
              </Sort>
            </HeadingWithSort>
          ) : (
            <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
              {name}
            </HeadingText>
          )
        })}
      </TableHeading>
      {sortedUsers.map(user => (
        <TableRow key={user.id} style={{ padding: '0px' }}>
          <Cell style={{ paddingLeft: '24px' }} title={user.id}>
            {user.ban ? <Block alt="blocked" src={block} /> : <EmptyBlock />}
            <Text>{`${user.id.slice(0, 12)}...`}</Text>
          </Cell>
          <Cell>{user.login}</Cell>
          <Cell>{user.login}</Cell>
          <Cell>{dateParser(user.createdAt)}</Cell>
          <MenuCell>
            <UsersTableMenu id={user.id} />
          </MenuCell>
        </TableRow>
      ))}
    </Table>
  )
}

export default UsersTable
