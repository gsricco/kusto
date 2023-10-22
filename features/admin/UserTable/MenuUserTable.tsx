import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { DELETE_USER, GET_USERS } from '../../../assets/apollo/users'
import person from '../../../public/img/icons/person.svg'
import block from '../../../public/img/icons/block_outline.svg'
import more from '../../../public/img/icons/more-horizontal-outline.svg'
import moreSelected from '../../../public/img/icons/more-horizontal_selected.svg'
import { MenuPropsType } from '../types'
import {
  MenuIconAdmin,
  MenuItemsAdmin,
  MenuItemWrapperAdmin,
  MoreAdmin,
  TextAdmin,
  UserMenuAdmin,
} from '../Admin.styled'

export const MenuUserTable = ({ id }: MenuPropsType) => {
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
    <UserMenuAdmin>
      <MoreAdmin
        alt="more"
        src={isActive ? moreSelected : more}
        style={{ marginTop: '6px' }}
        onClick={handleSelect}
      />
      {isActive && (
        <MenuItemsAdmin>
          {menu.map(item => (
            <MenuItemWrapperAdmin key={item.text} onClick={() => item.handler(id)}>
              <MenuIconAdmin alt={item.alt} src={item.src} />
              <TextAdmin>{item.text}</TextAdmin>
            </MenuItemWrapperAdmin>
          ))}
        </MenuItemsAdmin>
      )}
    </UserMenuAdmin>
  )
}
