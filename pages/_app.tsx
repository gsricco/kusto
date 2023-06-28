import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, useState} from 'react';
import {NextPage} from 'next';
import {useLoader} from 'assets/hooks/useLoader';
import 'styles/nprogress.css'
import '../styles/globals.css'
import { passwordRecoveryApi } from 'assets/api/passwordRecoveryApi';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';


export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  // const [queryClient] = useState(() => new QueryClient)

  useLoader()

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ApiProvider api={passwordRecoveryApi}>
            <Component {...pageProps} />
    </ApiProvider>
  );
}
