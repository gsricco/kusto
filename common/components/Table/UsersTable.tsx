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

type MenuProps = {
  id: string
}

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
      <More
        alt="more"
        src={isActive ? moreSelected : more}
        style={{ marginTop: '6px' }}
        onClick={handleSelect}
      />
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
  const tableHeadingData = ['User ID', 'Username', 'Profile Link', 'Date Added', '']

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
        <TableRow key={user.id} style={{ padding: '0px' }}>
          <Cell style={{ paddingLeft: '24px' }} title={user.id}>
            {user.ban ? <Block alt="blocked" src={block} /> : <EmptyBlock />}
            <Text>{`${user.id.slice(0, 12)}...`}</Text>
          </Cell>
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
  gap: 12px;
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
  padding: 12px 0;
  right: 0;
  z-index: 10;
  background: #171717;
  border: 1px solid #4c4c4c;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MenuIcon = styled(Image)``
