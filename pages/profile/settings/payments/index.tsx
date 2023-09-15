import { useEffect, useState } from 'react'

import { useLazyPaymentsQuery, usePaymentsQuery } from 'assets/store/api/payments/paymentsApi'
import { getLayout } from 'common/components/Layout/PageLayout/PageLayout'
import { useClient } from 'common/hooks/useClients'
import { dateParser } from 'common/utils/dateParser'
import { getSubscriptionType } from 'common/utils/getSubscriptionType'
import PagesNavigation from 'features/settings/Pagination'
import { TabBar } from 'features/settings/TabBar'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}
const Payments = () => {
  const initialPageSize = 2
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const { t } = useTranslation()
  const client = useClient()

  const [getPayments, { data: payments }] = useLazyPaymentsQuery()

  useEffect(() => {
    getPayments({ page, pageSize })
  }, [page, pageSize])

  const tableHeadingData = [
    'Date of Payment',
    'End date of subscription',
    'Price',
    'Subscription Type',
    'Payment Type',
  ]

  return (
    client && (
      <>
        <TabBarWrapper>
          <TabBar />
        </TabBarWrapper>
        <PageWrapper>
          <TableHeading>
            {tableHeadingData.map(name => (
              <HeadingText key={name}>{name}</HeadingText>
            ))}
          </TableHeading>
          {payments?.items.map(payment => (
            <TableRow key={payment.dateOfPayments}>
              <Cell>{dateParser(payment.dateOfPayments)}</Cell>
              <Cell>{dateParser(payment.endDateOfSubscription)}</Cell>
              <Cell>{payment.price}</Cell>
              <Cell>{getSubscriptionType(payment.price)}</Cell>
              <Cell>{payment.paymentType}</Cell>
            </TableRow>
          ))}
          {payments && (
            <PagesNavigation
              pageNumber={payments.page}
              pagesCount={payments.pagesCount}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </PageWrapper>
      </>
    )
  )
}

Payments.getLayout = getLayout
export default Payments

const TabBarWrapper = styled.div`
  max-width: 726px;
  width: 100%;
  padding: 36px 0 24px;
`

const HeadingText = styled.p`
  font-weight: 600;
`

const TableHeading = styled.div`
  background: #171717;
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
`
const TableRow = styled(TableHeading)`
  background: #0d0d0d;
`
const Cell = styled.p`
  text-align: start;
  font-weight: 400;
`

const PageWrapper = styled.div`
  display: flex;
  margin: 0 6% 0 12px;
  max-width: 1027px;
  display: flex;
  flex-direction: column;
`
