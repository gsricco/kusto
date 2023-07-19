import {ReactNode} from 'react';
import {TabBar} from './TabBar';
import styled from 'styled-components';
import {Navbar} from '../../common/components/Navbar/Navbar';
import {StyleProps} from './types';
import {useRouter} from 'next/router';

type SettingsPageWrapperType = {
  children: ReactNode
}

export const SettingsPageWrapper = ({children}: SettingsPageWrapperType) => {
  // const router = useRouter()
  // const {profile}=router.query

  return (
    <SettingsWrapper>
      <StyledContainerSettings>
        <TabBar/>
        <StyledContent>
          {children}
        </StyledContent>
      </StyledContainerSettings>
    </SettingsWrapper>
  );
};

const SettingsWrapper = styled.div
  `
    min-height: 90vh;
    display: flex;
    gap: 24px;

    @media (max-width: 1000px ) {
      justify-content: center;
    }
  `



export const StyledContainerSettings = styled.div
  `
    max-width: 726px;
    width: 100%;
    //padding-top: 36px;
  `

const StyledContent = styled.div
  `
    margin-top: 25px;
  `
