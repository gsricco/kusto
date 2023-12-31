import { PropsWithChildren, ReactElement, useState } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Menubar } from 'common/components/Menu/Menubar'
import { CreatePost } from 'common/components/Navbar/CreatePost/CreatePost'
import { mediaSizes } from 'common/constants/Profile/mediaSizes'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { baseTheme } from '../../../../styles/styledComponents/theme'
import Header from '../../Header/Header'
import { Navbar } from '../../Navbar/Navbar'

const { media } = mediaSizes
// const sidebar = mediaSizes.sidebarMedia

export const PageLayout: NextPage<PropsWithChildren> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  const router = useRouter()
  const { profile } = router.query

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)

  const openModalHandler = () => {
    setIsOpenModalEdit(true)
  }

  return (
    <StyledWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Page>
          <CreatePost isOpenModalEdit={isOpenModalEdit} setIsOpenModalEdit={setIsOpenModalEdit} />
          <NavbarWrapper>
            <Navbar openModalHandler={openModalHandler} showNavbar={profile} />
          </NavbarWrapper>
          <Main>{children}</Main>
        </Page>

        <MenuWrapper>
          <Menubar openModalHandler={openModalHandler} showMenuBar={profile} />
        </MenuWrapper>
      </LocalizationProvider>
    </StyledWrapper>
  )
}

export const getLayout = (page: ReactElement) => {
  return <PageLayout>{page}</PageLayout>
}

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${baseTheme.colors.dark['700']};
  color: ${baseTheme.colors.light[100]};
`
const Page = styled.div`
  display: flex;
  max-width: 1310px;
  width: 100%;
  /* gap: 16px; */

  padding: 0 0px;
  /* margin: auto; */
`

export const Main = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-left: 220px;
  padding: 20px;
  overflow-y: auto;
  /* padding-top: 36px; */
  /* padding-left: 0px; */
  /* flex-grow: 1;
  max-width: 80vw; */

  @media (max-width: 960px) {
    margin-left: 0;
  }
`

export const NavbarWrapper = styled.div`
  /* height: 660px;
  width: 220px;
  min-width: 150px; 
  max-width: 220px;
  align-items: start;
  font-family: Inter; */

  @media (max-width: 1024px) {
    display: none;
  }
`
// from gennadyi
export const MenuWrapper = styled.div`
  display: none;

  @media (max-width: 960px) {
    bottom: 0;
    position: fixed;
    display: flex;
    height: 60px;
    width: 100%;
    flex-shrink: 0;
    min-width: 360px;
    /* max-width: 220px; */
    align-items: center;
    font-family: Inter;
    justify-content: center;
    border-top: 1px solid ${baseTheme.colors.dark[300]};
    background: ${baseTheme.colors.dark[700]};
  }
`
