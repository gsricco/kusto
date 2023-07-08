import React from 'react';
import styled from 'styled-components';
import {ITEM_LINK} from './constant';
import {MainLink} from '../MainLink/MainLink';
import {baseTheme} from '../../../styles/styledComponents/theme';
import {LogoutLink} from '../LogoutLink/logoutLink';

export const Navbar = () => {

  const items = ITEM_LINK.map(item => <MainLink
    key={item.name}
    src={item.icon}
    name={item.name}
    href={item.href}
  />)

  return (
    <StyledSidebar>
      <StyledItemBlock>
        {items}
      </StyledItemBlock>
      <StyledLogout>
        <LogoutLink/>
      </StyledLogout>
    </StyledSidebar>
  )
}


const StyledSidebar = styled.div
  `
  position: relative;
  height: 100%;
  border-right: 1px solid ${baseTheme.colors.dark[300]};
`

const StyledItemBlock = styled.div
  `
  margin-left: 40px;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  > * {
    &:last-child {
      margin-top: 84px;
    }
  }

  @media (max-width: 940px) {
    margin-left: 20px;
  }
`

const StyledLogout = styled.div`
  position: absolute;
  bottom: 36px;
  left: 40px;

  @media (max-width: 940px) {
    left: 20px;
  }
`
