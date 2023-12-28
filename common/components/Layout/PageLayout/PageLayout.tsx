import { PropsWithChildren, ReactElement, useState, ReactNode } from 'react'

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

export const PageLayout: NextPage<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const { status } = router.query

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)

  const openModalHandler = () => {
    setIsOpenModalEdit(true)
  }

  return (
    <StyledWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header isAdmin={false} />
        <Page>
          <CreatePost isOpenModalEdit={isOpenModalEdit} setIsOpenModalEdit={setIsOpenModalEdit} />
          <NavbarWrapper>
            <Navbar openModalHandler={openModalHandler} showNavbar={status} />
          </NavbarWrapper>
          <Main>{children}</Main>
        </Page>

        <MenuWrapper>
          <Menubar isCreate={isOpenModalEdit} openModalHandler={openModalHandler} />
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

  padding: 0 0px;
`

export const Main = styled.div`
  width: 100%;

  margin-top: 60px;
  margin-left: 220px;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 960px) {
    margin-left: 0;
  }
`

export const NavbarWrapper = styled.div`
  @media (max-width: ${media}) {
    display: none;
  }
`
// from gennadyi
export const MenuWrapper = styled.div`
  display: none;

  @media (max-width: 960px) {
    position: fixed;
    bottom: 0;

    height: 60px;
    width: 100%;
    min-width: 360px;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    font-family: Inter;
    border-top: 1px solid ${baseTheme.colors.dark[300]};
    background: ${baseTheme.colors.dark[700]};
  }
`
