import { useQuery } from '@apollo/client'
import { GET_USER_IMAGES } from 'assets/apollo/users'
import { AllPaymentsResponse } from 'assets/store/api/payments/types'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import { useClient } from 'common/hooks/useClients'
import UserInfo from 'features/admin/UserInfo/UserInfo'
import PagesNavigation from 'features/settings/Pagination'
import { TFunction } from 'i18next'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'
import { PageWrapper, TabBarWrapper } from 'styles/styledComponents/payments/payments.styled'

/*
    Страница отображения списка подписчиков польователя
*/
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params } = context
  const { userId } = params || {}

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['admin'], config)),
      userId,
    },
  }
}

type propsType = {
  userId: string
}

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

// const payments = {
//   pagesCount: 0,
//   page: 1,
//   pageSize: 10,
//   totalCount: 0,
//   items: [],
// }

const Followers = ({ userId }: propsType) => {
  const baseUrl = `/admin/${userId}`

  // const initialPageSize = 10
  const { t } = useTranslation('admin')
  // const { language } = i18n
  // const [page, setPage] = useState(1)
  // const [pageSize, setPageSize] = useState(initialPageSize)
  // const [getPayments, { data: payments }] = useLazyPaymentsQuery()
  const client = useClient()

  const tableHeadingData = [t('user_id'), t('username'), t('profile_link'), t('subscription_date')]

  return (
    client && (
      <>
        <UserInfo userId={userId} />
        <TabBar baseUrl={baseUrl} t={t} titleList={adminUserTabData} />
        <PageWrapper>
          <Table>
            <TableHeading>
              {tableHeadingData.map((name, index) => (
                <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
                  {name}
                </HeadingText>
              ))}
            </TableHeading>
            <tbody>
              {users.map((item, index) => (
                <TableRow key={item.userID}>
                  {(Object.keys(item) as Array<keyof typeof item>).map(key => (
                    <Cell key={key} style={{ paddingLeft: '24px' }}>
                      {cellParses[key](item[key])}
                    </Cell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </PageWrapper>
      </>
    )
  )
}

// {
//   <PagesNavigation
//           pageNumber={payments.page}
//           pagesCount={payments.pagesCount}
//           pageSize={pageSize}
//           t={t}
//           onPageChange={setPage}
//           onPageSizeChange={setPageSize}
//         />
// }

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
