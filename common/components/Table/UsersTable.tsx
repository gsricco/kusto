import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { UsersQuery } from 'assets/apollo/__generated__/graphql'
import { DELETE_USER, GET_USERS } from 'assets/apollo/users'
import { dateParser } from 'common/utils/dateParser'
import { TFunction } from 'i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import block from 'public/img/icons/block_outline.svg'
import more from 'public/img/icons/more-horizontal-outline.svg'
import moreSelected from 'public/img/icons/more-horizontal_selected.svg'
import person from 'public/img/icons/person.svg'
import down from 'public/img/icons/sort_down.svg'
import up from 'public/img/icons/sort_up.svg'
import styled from 'styled-components'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from 'styles/styledComponents/payments/payments.styled'

type MenuProps = {
  id: string
}

const Menu = ({ id }: MenuProps) => {
  const [isActive, setIsActive] = useState(false)

  const handleSelect = () => {
    setIsActive(prev => !prev)
  }

  const { push } = useRouter()

  const handleNavigate = (userId: string): void => {
    push(`/admin/${userId}`)
  }

  const blockUser = () => {
    console.log('blocked')
  }

  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    variables: {
      userId: id,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const menu = [
    { src: person, alt: 'icon', text: 'Delete User', handler: deleteUser },
    { src: block, alt: 'icon', text: 'Ban in the system', handler: blockUser },
    { src: more, alt: 'icon', text: 'More Information', handler: handleNavigate },
  ]

  return (
    <UserMenu>
      <More
        alt="more"
        src={isActive ? moreSelected : more}
        style={{ marginTop: '6px' }}
        onClick={handleSelect}
      />
      {isActive && (
        <MenuItems>
          {menu.map(item => (
            <MenuItemWrapper key={item.text} onClick={() => item.handler(id)}>
              <MenuIcon alt={item.alt} src={item.src} />
              <Text>{item.text}</Text>
            </MenuItemWrapper>
          ))}
        </MenuItems>
      )}
    </UserMenu>
  )
}

type TableProps = {
  // checkSelectedSort: (sortType: string) => void
  // selectSortDirection: () => void
  // selectdSort: () => void
  t: TFunction<'translation', undefined>
  users: UsersQuery | undefined
}

const UsersTable = ({ t, users }: TableProps) => {
  const tableHeadingData = ['User ID', 'Username', 'Profile Link', 'Date Added', '']

  return (
    <Table style={{ maxWidth: '1024px', width: '100%' }}>
      <TableHeading>
        {tableHeadingData.map((name, index) => {
          return index % 2 ? (
            <HeadingWithSort key={name}>
              <p>{name}</p>
              <Sort>
                <SelectSortDirection alt="arrow" src={up} />
                <SelectSortDirection alt="arrow" src={down} />
              </Sort>
            </HeadingWithSort>
          ) : (
            <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
              {name}
            </HeadingText>
          )
        })}
      </TableHeading>
      {users?.users.map(user => (
        <TableRow key={user.id} style={{ padding: '0px' }}>
          <Cell style={{ paddingLeft: '24px' }} title={user.id}>
            {user.ban ? <Block alt="blocked" src={block} /> : <EmptyBlock />}
            <Text>{`${user.id.slice(0, 12)}...`}</Text>
          </Cell>
          <Cell>{user.login}</Cell>
          <Cell>{user.login}</Cell>
          <Cell>{dateParser(user.createdAt)}</Cell>
          <MenuCell>
            <Menu id={user.id} />
          </MenuCell>
        </TableRow>
      ))}
    </Table>
  )
}

export default UsersTable

const HeadingWithSort = styled(HeadingText)`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Sort = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const SelectSortDirection = styled(Image)`
  cursor: pointer;
`

const MenuCell = styled(Cell)`
  min-width: 30px;
  display: flex;
  justify-content: center;
`
const EmptyBlock = styled.span`
  width: 24px;
  height: 24px;
  display: inline-block;
`

const UserMenu = styled.div`
  position: relative;
  color: white;
`
const MenuItemWrapper = styled.span`
  width: 178px;
  display: flex;
  padding: 0 12px;
  cursor: pointer;
`

const More = styled(Image)`
  cursor: pointer;
`
const Block = styled(Image)`
  margin-bottom: -6px;
`

const Text = styled.span`
  font-size: 14px;
  font-weight: 400;
  position: relative;
  left: 10px;
`

const MenuItems = styled.div`
  position: absolute;
  padding: 12px 10px 12px 0;
  right: 0;
  z-index: 10;
  background: #171717;
  border: 1px solid #4c4c4c;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MenuIcon = styled(Image)``
