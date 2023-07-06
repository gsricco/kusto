import React from 'react';
import styled from 'styled-components';
import {ITEM_LINK} from './constant';
import {MainLink} from '../MainLink/MainLink';
import {baseTheme} from '../../../styles/styledComponents/theme';

export const Navbar = () => {
  return (
    <StyledSidebar>
      <StyledItemBlock>
        {
          ITEM_LINK.map(item => <MainLink
            key={item.name}
            src={item.icon}
            name={item.name}
            href={item.href}
          />)
        }
      </StyledItemBlock>
    </StyledSidebar>
  )
}


const StyledSidebar = styled.div`
  height: calc(100vh - 60px);
  width: 17vw;
  border-right: 1px solid ${baseTheme.colors.dark[300]};
  align-items: start;
`

const StyledItemBlock = styled.div`
  margin-left: 60px;
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
`
