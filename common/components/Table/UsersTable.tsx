import React, { useState } from 'react'

import person from 'public/img/icons/person.svg'
import more from 'public/img/icons/more-horizontal-outline.svg'
import block from 'public/img/icons/block_outline.svg'
import moreSelected from 'public/img/icons/more-horizontal_selected.svg'
import { dateParser } from 'common/utils/dateParser'
import { TFunction } from 'i18next'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from 'styles/styledComponents/payments/payments.styled'
import { UsersQuery } from 'assets/apollo/__generated__/graphql'
import Image from 'next/image'
import styled from 'styled-components'

const Menu = () => {
  const menu = [
    { src: person, alt: 'icon', text: 'Delete User' },
    { src: block, alt: 'icon', text: 'Ban in the system' },
    { src: more, alt: 'icon', text: 'More Information' },
  ]

  const [isActive, setIsActive] = useState(false)

  const handleSelect = () => {
    setIsActive(prev => !prev)
  }

  return (
    <UserMenu>
      <More alt="more" src={isActive ? moreSelected : more} onClick={handleSelect} />
      {isActive && (
        <MenuItems>
          {menu.map(item => (
            <MenuItemWrapper key={item.text}>
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
  t: TFunction<'translation', undefined>
  users: UsersQuery | undefined
}

const UsersTable = ({ t, users }: TableProps) => {
  const tableHeadingData = ['UserId', 'Username', 'Profile Link', 'Date Added', '']

  return (
    <Table style={{ maxWidth: '1024px', width: '100%' }}>
      <TableHeading>
        {tableHeadingData.map((name, index) => (
          <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
            {name}
          </HeadingText>
        ))}
      </TableHeading>
      {users?.users.map(user => (
        <TableRow key={user.id}>
          <Cell style={{ paddingLeft: '24px' }} title={user.id}>{`${user.id.slice(
            0,
            12
          )}...`}</Cell>
          <Cell>{user.login}</Cell>
          <Cell>{user.login}</Cell>
          <Cell>{dateParser(user.createdAt)}</Cell>
          <MenuCell>
            <Menu />
          </MenuCell>
        </TableRow>
      ))}
    </Table>
  )
}

export default UsersTable

const MenuCell = styled(Cell)`
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserMenu = styled.div`
  position: relative;
  color: white;
`
const MenuItemWrapper = styled.span`
  width: 178px;
  display: flex;
  gap: 12px;
  padding: 0 12px;
  cursor: pointer;
`

const More = styled(Image)`
  cursor: pointer;
`

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
`

const MenuItems = styled.div`
  position: absolute;
  padding: 12px 0;
  right: 20px;
  z-index: 10;
  background: #171717;
  border: 1px solid #4c4c4c;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MenuIcon = styled(Image)``
