/* eslint-disable import/order */
import React, { ReactElement, ReactNode } from 'react'

import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'

import { store } from '../assets/store/store'
import { useLoader } from '../common/hooks/useLoader'

import 'styles/nprogress.css'
import { ApolloProvider } from '@apollo/client'
import client from 'assets/apollo/client'
import { GlobalStyle } from '../styles/styledComponents/GlobalAPP.styled'

export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PrivateRoute>
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
        </PrivateRoute>
      </ApolloProvider>
    </Provider>
  )
}

export default appWithTranslation(App as React.FC)
