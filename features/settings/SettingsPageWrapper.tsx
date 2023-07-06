import {ReactNode} from 'react';
import {TabBar} from './TabBar';
import {StyledContainerAuth} from '../../styles/styledComponents/auth/Auth.styled';
import styled from 'styled-components';
import {Navbar} from '../../common/components/Navbar/Navbar';

type SettingsPageWrapperType = {
  children: ReactNode
}

export const SettingsPageWrapper = ({children}: SettingsPageWrapperType) => {

  const firstVisit = true

  return (
    <SettingsWrapper $isVisit={firstVisit}>
      {firstVisit && (
        <Navbar/>
      )}
      <StyledContainerSettings>
        <TabBar/>
        {children}
      </StyledContainerSettings>
    </SettingsWrapper>
  );
};

type SettingsPageWrapper = {
  $isVisit: boolean
}

const SettingsWrapper = styled('div')<SettingsPageWrapper>(
  ({$isVisit}) => ({
    width: '96vw',
    minHeight: '90vh',
    paddingTop: $isVisit ? '' : '36px',

    display: 'flex',
    justifyContent: $isVisit ? 'inherit' : 'center',
    alignItems: 'center',
    gap: '30px',
  }))

const StyledContainerSettings = styled(StyledContainerAuth)`
  width: 57vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
