import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

import { baseTheme } from '../../styles/styledComponents/theme'

export const TabBar = () => {
  const location = usePathname()
  const isActive = (name: string) => (location.includes(name) ? 'active' : '')

  return (
    <StyledNavigation>
      <StyledItem
        active={location === '/profile/settings' ? 'active' : ''}
        href="/profile/settings"
      >
        General information
      </StyledItem>
      <StyledItem active={isActive('devices')} href="/profile/settings/devices">
        Devices
      </StyledItem>
      <StyledItem active={isActive('acc_management')} href="/profile/settings/acc_management">
        Account Management
      </StyledItem>
      <StyledItem active={isActive('payments')} href="/profile/settings/payments">
        My payments
      </StyledItem>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.header`
  transition: all;
  width: 100%;
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledItem = styled(Link)<{ active: string }>`
  display: inline-block;
  width: 100%;
  max-width: 726px;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${props =>
    props.active === 'active' ? baseTheme.colors.accent[500] : baseTheme.colors.dark[100]};
  text-align: center;
  white-space: nowrap;
  text-decoration: none;

  padding: 5px 15px;
  border-bottom: ${props =>
    props.active === 'active'
      ? `2px solid ${baseTheme.colors.accent[500]}`
      : `2px solid ${baseTheme.colors.dark[100]}`};

  &:hover {
    color: ${baseTheme.colors.dark[300]};
    border-bottom: 2px solid ${baseTheme.colors.dark[300]};
  }
`
