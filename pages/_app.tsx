import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, useState} from 'react';
import {NextPage} from 'next';
import {QueryClient} from '@tanstack/query-core';
import {Hydrate, QueryClientProvider} from '@tanstack/react-query';
import {useLoader} from 'assets/hooks/useLoader';
import 'styles/nprogress.css'
import '../styles/globals.css'
// import {Inter} from "@next/font/google";


export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
// If loading a variable font, you don't need to specify the font weight
// const inter = Inter({
//     weight: ['400', '700'],
//     subsets: ['latin'],
//     display: 'swap',
// })

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const [queryClient] = useState(() => new QueryClient)


    useLoader()

    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydrateState}>
                {/*<main className={inter.className}>*/}
                <Component {...pageProps} />
                {/*</main>*/}
            </Hydrate>
        </QueryClientProvider>
    );
}
