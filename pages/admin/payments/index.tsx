import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL_PAYMENTS } from '../../../assets/apollo/users'
import { useEffect } from 'react'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const PaymentsAdmin = () => {
  const [getPayments, { data: payments }] = useLazyQuery(GET_ALL_PAYMENTS, {
    variables: {
      sortBy: 'createdAt',
      sortDirection: 'desc',
      pageNumber: 1,
      pageSize: 10,
      searchName: '',
    },
  })
  console.log(payments)

  useEffect(() => {
    getPayments()
  }, [])

  return (
    <>
      <h1>Payments</h1>
      <h1>{payments?.allPayments[1].user?.profiles?.photo}</h1>
    </>
  )
}

export default PaymentsAdmin
PaymentsAdmin.getLayout = getLayout
