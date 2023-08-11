import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { useLoader } from "../common/hooks/useLoader";
import "styles/nprogress.css";
import { Provider } from "react-redux";
import { store } from "../assets/store/store";
import { appWithTranslation } from "next-i18next";
import { createGlobalStyle } from "styled-components";
import PrivateRoute from "common/components/PrivateRoute/PrivateRoute";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  useLoader();

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SessionProvider session={session}>
      <Provider store={store}>
        <GlobalStyle />
      <PrivateRoute>
          <Component {...pageProps} />
      </PrivateRoute>
      </Provider>
    </SessionProvider>
  );
};

export default appWithTranslation(App as React.FC);

const GlobalStyle = createGlobalStyle`
  *{
    font-family: Inter;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
`;
