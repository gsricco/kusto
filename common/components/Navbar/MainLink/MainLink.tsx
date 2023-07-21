import {FC} from 'react';
import Image from 'next/image';
import {AppLink} from '../AppLink/AppLink';
import {StyledDiv, StyledText} from "../Navbar.styled";

interface SidebarLinkProps {
  src: string
  name: string
  href: string
  isActive: boolean
}

export const MainLink: FC<SidebarLinkProps> = ({ name, src, href, isActive}) => {
  return (
    <AppLink href={href}>
      <StyledDiv>
        {src? <Image
            src={src}
            alt={'some icon'}
            width={24}
            height={24}
        />
        :<div style={{width:'24px', height:'24px'}}></div>}
        <StyledText isActive={isActive}>{name}</StyledText>
      </StyledDiv>
    </AppLink>
  )
}
