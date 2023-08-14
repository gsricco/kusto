import {NextPage} from "next";
import {PropsWithChildren, ReactElement} from "react";
import {Layout} from "../Layout";
import Head from "next/head";

export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
  const {children} = props

  return <Layout>
    <Head><title>KustoProject</title></Head>
    {children}
  </Layout>
}

export const getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}