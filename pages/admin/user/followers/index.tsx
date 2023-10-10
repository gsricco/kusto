import { useState, useEffect } from 'react'

import { useLazyGetUserPostsQuery, useLazyGetPostQuery } from 'assets/store/api/posts/postsApi'
import { useLazyPaymentsQuery } from 'assets/store/api/payments/paymentsApi'
import { CreatePostResponse, GetPostResponse } from 'assets/store/api/posts/types'
import { useLazyProfileQuery } from 'assets/store/api/profile/profileApi'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import UserInfo from 'features/admin/UserInfo'
import { GetStaticPropsContext } from 'next'
import { TFunction, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'
import { PageWrapper, TabBarWrapper } from 'styles/styledComponents/payments/payments.styled'
import PaymentsTable from 'common/components/Table/Table'
import PagesNavigation from 'features/settings/Pagination'
import { useClient } from 'common/hooks/useClients'
import { AllPaymentsResponse } from 'assets/store/api/payments/types'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

// type TableProps = {
//     language: string
//     payments: AllPaymentsResponse | undefined
//     t: TFunction<'translation', undefined>
//   }

const Followers = () => {
  const initialPageSize = 10
  const { t, i18n } = useTranslation()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  // const [getPayments, { data: payments }] = useLazyPaymentsQuery()
  const client = useClient()

  const tableHeadingData = [t('user_id'), t('username'), t('profile_link'), t('subscription_date')]

  const baseUrl = '/admin/user'
  const adminUserTabData = [
    {
      name: 'Uploaded photos',
      ref: '',
    },
    {
      name: 'Payments',
      ref: 'payments',
    },
    {
      name: 'Followers',
      ref: 'followers',
    },
    {
      name: 'Following',
      ref: 'following',
    },
  ]

  const users = [
    { userID: 'ID_User1', userName: 'User1', profileLink: 'url1', ScrbDate: '12.12.2020' },
    { userID: 'ID_User2', userName: 'User2', profileLink: 'url2', ScrbDate: '10.12.2020' },
    { userID: 'ID_User3', userName: 'User3', profileLink: 'url3', ScrbDate: '09.12.2020' },
  ]

  interface CellParses {
    [key: string]: (value: string) => React.ReactNode
  }

  const cellParses: CellParses = {
    userID: value => value,
    userName: value => value,
    profileLink: value => <a href={value}>{value}</a>,
    ScrbDate: value => new Date(value).toLocaleDateString(),
  }

  const payments = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  }

  return (
    <>
      <UserInfo />
      <TabBar baseUrl={baseUrl} titleList={adminUserTabData} />
      <PageWrapper>
        <Table>
          <TableHeading>
            {tableHeadingData.map((name, index) => (
              <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
                {name}
              </HeadingText>
            ))}
          </TableHeading>
          {/* {users.map((user, index) => (
            <TableRow key={user.userID}>
              <Cell style={{paddingLeft: '24px'}}>{user.userID}</Cell>
              <Cell>{user.userName}</Cell>
              <Cell>{user.profileLink}</Cell>
              <Cell>{user.ScrbDate}</Cell>
            </TableRow>
          ))} */}
          {users.map((item, index) => (
            <TableRow key={item.userID}>
              {(Object.keys(item) as Array<keyof typeof item>).map(key => (
                <Cell style={{ paddingLeft: '24px' }} key={key}>
                  {cellParses[key](item[key])}
                </Cell>
              ))}
            </TableRow>
          ))}
        </Table>

        {/* <PagesNavigation
          pageNumber={payments.page}
          pagesCount={payments.pagesCount}
          pageSize={pageSize}
          t={t}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        /> */}
      </PageWrapper>
    </>
  )
}

Followers.getLayout = getLayout
export default Followers

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: 24px;
  padding: 0 24px;
`

export const HeadingText = styled.td`
  padding: 12px 0;
  font-weight: 600;
`

export const TableHeading = styled.tr`
  padding: 12px 0;
  background: #171717;
`
export const TableRow = styled.tr`
  padding: 12px 0;
`

export const Cell = styled.td`
  min-width: 60px;
  padding: 12px 0;
  font-weight: 400;
`
