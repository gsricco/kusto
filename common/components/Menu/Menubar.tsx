import { useEffect, useState } from 'react'

import { getCurrentPath } from 'common/utils/getCurrentPath'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { links } from './constant'
import { create, falsy, home, message, profile, search } from './states'

export type MenuBarPropsType = {
  isCreate: boolean
  openModalHandler: () => void
}

export const Menubar = ({ isCreate, openModalHandler }: MenuBarPropsType) => {
  const { asPath } = useRouter()

  const [isActive, setIsActive] = useState(falsy)

  useEffect(() => {
    const currentPath = getCurrentPath(asPath)

    const checkCurrentPath = (path: string): void => {
      switch (path) {
        case 'profile': {
          setIsActive(profile)
          break
        }
        case 'home': {
          setIsActive(home)
          break
        }
        case 'search': {
          setIsActive(search)
          break
        }
        case 'messenger': {
          setIsActive(message)
          break
        }
        default: {
          break
        }
      }
    }

    if (isCreate) {
      setIsActive(create)
    } else {
      checkCurrentPath(currentPath)
    }
  }, [isCreate, asPath])

  const handleClick = (name: string): void => {
    if (name === 'create') {
      openModalHandler()
    }
  }

  return (
    <Menu>
      {links.map((item, index) => (
        <MenuLink key={item.name} href={item.href}>
          <MenuIcon
            alt={item.name}
            height={24}
            src={isActive[index] ? item.selectIcon : item.icon}
            width={24}
            onClick={() => handleClick(item.name)}
          />
        </MenuLink>
      ))}
    </Menu>
  )
}

export const Menu = styled.nav`
  display: flex;
  gap: 36px;
`
export const MenuLink = styled(Link)`
  cursor: pointer;
`
export const MenuIcon = styled(Image)``
