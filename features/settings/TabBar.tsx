import React, {useState} from 'react';
import styled from 'styled-components';
import {baseTheme} from '../../styles/styledComponents/theme';

export const TabBar = () => {
  const [activeLink, setActiveLink] = useState('General_information');

  const linkClass = (name: string) => activeLink === name ? 'active' : ''

  const onClickItemHandler = (name: string) => {
    setActiveLink(name)
  }

  return (
    <StyledNavigation>
      <StyledItem
        onClick={() => onClickItemHandler('General_information')}
        className={linkClass('General_information')}
      >
        General information
      </StyledItem>
      <StyledItem
        onClick={() => onClickItemHandler('Devices')}
        className={linkClass('Devices')}
      >
        Devices
      </StyledItem>
      <StyledItem
        onClick={() => onClickItemHandler('Account_Management')}
        className={linkClass('Account_Management')}
      >
        Account Management
      </StyledItem>
      <StyledItem
        onClick={() => onClickItemHandler('payments')}
        className={linkClass('payments')}
      >
        My payments
      </StyledItem>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.header`
  transition: all;
  width: 100%;
  display: flex;
  
  @media (max-width: 790px ) {
    width: 100%;
  }
  @media (max-width: 480px ) {
    flex-wrap: wrap;
  }
`

const StyledItem = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${baseTheme.colors.dark[100]};

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  padding: 5px;
  border-bottom: 2px solid ${baseTheme.colors.dark[100]};

  &:hover {
    color: ${baseTheme.colors.dark[300]};
    border-bottom: 2px solid ${baseTheme.colors.dark[300]};
  }
  
  &.active {
    color: ${baseTheme.colors.accent[500]};
    border-bottom: 2px solid ${baseTheme.colors.accent[500]};
  }
`;
