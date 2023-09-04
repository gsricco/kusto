import { FC } from 'react'

import { AppLink } from 'common/components/Navbar/AppLink/AppLink'
import Image from 'next/image'

import { StyledDiv } from '../Menubar.styled'

interface SidebarLinkProps {
  href: string
  isactive: string
  name: string
  src: string
}

export const MainLink: FC<SidebarLinkProps> = ({ name, src, href, isactive }) => {
  return (
    <AppLink href={href}>
      <StyledDiv>
        {src ? (
          <Image alt="some icon" height={24} src={src} width={24} />
        ) : (
          <div style={{ width: '24px', height: '24px' }} />
        )}
      </StyledDiv>
    </AppLink>
  )
}
