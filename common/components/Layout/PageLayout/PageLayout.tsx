// import {NextPage} from 'next';
// import {PropsWithChildren, ReactElement} from 'react';
// import Header from '../../Header/Header';
// import {Navbar} from '../../Navbar/Navbar';
// import styled from 'styled-components';
// import {baseTheme} from '../../../../styles/styledComponents/theme';
// import {store} from '../../../../assets/store/store';
// import {Provider} from 'react-redux';
// import {useRouter} from "next/router";
// import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
// import {LocalizationProvider} from "@mui/x-date-pickers";
//
//
//
// export const PageLayout: NextPage<PropsWithChildren> = (props) => {
//   const {children} = props
//   const router = useRouter()
//   const {profile}=router.query
//   return (
//     <StyledWrapper>
//       {/*<Provider store={store}>*/}
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Header/>
//         <Page>
//           {/*<Navbar/>*/}
//           <NavbarWrapper >
//               <Navbar showNavbar={profile}/>
//           </NavbarWrapper>
//           <Main>{children}</Main>
//         </Page>
//       {/*</Provider>*/}
//       </LocalizationProvider>
//     </StyledWrapper>
//   )
// }
//
// export const getLayout = (page: ReactElement) => {
//   return <PageLayout>{page}</PageLayout>
// }
//
//
// const StyledWrapper = styled.div
//   ` width: 100%;
//     min-height: 100vh;
//
//     background: ${baseTheme.colors.dark['700']};
//     color: ${baseTheme.colors.light[100]};
//   `
//
// const Page = styled.div
//   `
//     display: flex;
//     max-width: 1310px;
//     width: 100%;
//     gap: 24px;
//
//     padding: 0 15px;
//     margin: auto;
//   `
//
// export const Main = styled.div`
//   padding-top: 36px;
//   flex-grow: 1;
// `
//
// export const NavbarWrapper = styled.div
//   `
//     height: 660px;
//     width: 17vw;
//     min-width: 150px;
//     max-width: 220px;
//     align-items: start;
//
//
//
//     @media (max-width: 1000px ) {
//       display: none;
//     }
//     @media (max-width: 790px) {
//       display: none;
//     }
//
//   `
