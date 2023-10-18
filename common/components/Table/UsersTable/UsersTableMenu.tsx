import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { DELETE_USER, GET_USERS } from '../../../../assets/apollo/users'
import person from '../../../../public/img/icons/person.svg'
import block from '../../../../public/img/icons/block_outline.svg'
import more from '../../../../public/img/icons/more-horizontal-outline.svg'
import moreSelected from '../../../../public/img/icons/more-horizontal_selected.svg'
import { MenuIcon, MenuItems, MenuItemWrapper, More, Text, UserMenu } from './UsersTable.styled'

type MenuProps = {
  id: string
}

export const UsersTableMenu = ({ id }: MenuProps) => {
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
