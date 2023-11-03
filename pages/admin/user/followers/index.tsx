import { useQuery } from '@apollo/client'
import { GET_USER_IMAGES } from 'assets/apollo/users'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import UserInfo from 'features/admin/UserInfo'
import CommonTable from 'common/components/Table/CommonTable'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { TFunction } from 'i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'
import { PageWrapper, TabBarWrapper } from 'styles/styledComponents/payments/payments.styled'
import PagesNavigation from 'features/settings/Pagination'
import { useClient } from 'common/hooks/useClients'
import { AllPaymentsResponse } from 'assets/store/api/payments/types'

/*
    Страница отображения списка подписчиков польователя
*/
export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['admin'], config)),
    },
  }
}

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

// временные данные для заполнения таблицы
const users = [
  { id: '1', userID: 'ID_User1', userName: 'User1', profileLink: 'url1', ScrbDate: '12.12.2020' },
  { id: '2', userID: 'ID_User2', userName: 'User2', profileLink: 'url2', ScrbDate: '10.12.2020' },
  { id: '3', userID: 'ID_User3', userName: 'User3', profileLink: 'url3', ScrbDate: '09.12.2020' },
]

const cellParses = {
  userID: (value: string) => value,
  userName: (value: string) => value,
  profileLink: (value: string) => <a href={value}>{value}</a>,
  ScrbDate: (value: string) => new Date(value).toLocaleDateString(),
}

const Followers = () => {
  // const initialPageSize = 10
  const { t, i18n } = useTranslation('admin')
  const { language } = i18n
  // const [page, setPage] = useState(1)
  // const [pageSize, setPageSize] = useState(initialPageSize)
  // const [getPayments, { data: payments }] = useLazyPaymentsQuery()
  const client = useClient()

  const tableHeadingData = [t('user_id'), t('username'), t('profile_link'), t('subscription_date')]

  return (
    client && (
      <>
        <UserInfo />
        <TabBar baseUrl={baseUrl} t={t} titleList={adminUserTabData} />
        <PageWrapper>
          <CommonTable
            cellParses={cellParses}
            tableData={users}
            tableHeadingData={tableHeadingData}
          />
        </PageWrapper>
      </>
    )
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
