import {NextPage} from 'next';
import {PropsWithChildren, ReactElement} from 'react';
import Header from '../../Header/Header';
import {Navbar} from '../../Navbar/Navbar';
import styled from 'styled-components';
import {baseTheme} from '../../../../styles/styledComponents/theme';

export const PageLayout: NextPage<PropsWithChildren> = (props) => {
  const {children} = props
  return (
    <StyledWrapper>
      <Header/>
      <Page>
        <Navbar/>
        <Main>{children}</Main>
      </Page>
    </StyledWrapper>
  )
}

export const getLayout = (page: ReactElement) => {
  return <PageLayout>{page}</PageLayout>
}


const StyledWrapper = styled.div
  ` width: 100%;
    min-height: 100vh;

    background: ${baseTheme.colors.dark['700']};
    color: ${baseTheme.colors.light[100]};
  `

const Main = styled.div`
  padding-top: 35px;
  padding-left: 24px;
`

const Page = styled.div`
  display: flex;
`
