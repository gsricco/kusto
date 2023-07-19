import {NextPage} from 'next';
import {PropsWithChildren, ReactElement} from 'react';
import Header from '../../Header/Header';
import styled from 'styled-components';
import {baseTheme} from '../../../../styles/styledComponents/theme';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {Navbar} from "../../Navbar/Navbar";
import {useRouter} from "next/router";

export const SettingsLayout: NextPage<PropsWithChildren> = (props) => {
  const {children} = props
  const router = useRouter()
  const {profile}=router.query
  return (
    <StyledWrapper>
      {/*<Provider store={store}>*/}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Header/>
          <Page>
            <NavbarWrapper >
              <Navbar showNavbar={profile}/>
            </NavbarWrapper>
            <Main>{children}</Main>
          </Page>
        </LocalizationProvider>
      {/*</Provider>*/}
    </StyledWrapper>
  )
}

export const getLayout = (page: ReactElement) => {
  return <SettingsLayout>{page}</SettingsLayout>
}


const StyledWrapper = styled.div
  // ` width: 100%;
  //   max-width: 100vw;
  //   min-height: 100vh;
  //
  //   background: ${baseTheme.colors.dark['700']};
  //   color: ${baseTheme.colors.light[100]};
  // `
  ` width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${baseTheme.colors.dark['700']};
    color: ${baseTheme.colors.light[100]};  `

const Page = styled.div
  `
  //max-width: 1310px;
  //width: 100%;
  //padding: 0 15px;
  //margin: auto;
    
    display: flex;
    max-width: 1310px;
    width: 100%;
    gap: 24px;

    padding: 0 15px;
    margin: auto;
`
const Main = styled.div`
  padding-top: 36px;
  flex-grow: 1;
  max-width: 80vw;
`

const NavbarWrapper = styled.div
  `
    height: 660px;
    width: 17vw;
    //min-width: 150px;
    max-width: 220px;
    align-items: start;
 
    

    @media (max-width: 1000px ) {
      display: none;
    }
    @media (max-width: 790px) {
      display: none;
    }

  `