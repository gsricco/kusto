import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL_PAYMENTS, GET_TOTAL_COUNT_PAYMENTS } from '../../../assets/apollo/users'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClient } from '../../../common/hooks/useClients'
import { useDebounce } from '../../../common/hooks/useDebounce'
import {
  SearchAdmin,
  SearchBarAdmin,
  SearchIconAdmin,
  WrapperAdmin,
} from '../../../features/admin/Admin.styled'
import search from '../../../public/img/icons/search.svg'
import { SelectStatusAdmin } from '../../../features/admin/SelectStatusAdmin'
import UsersTable from '../../../common/components/Table/UsersTable'
import PagesNavigation from '../../../features/settings/Pagination'
import PaymentsTable from '../../../common/components/Table/PaymentsTable'
import {
  TableHeaderType,
  UniversalTable,
} from '../../../common/components/Table/UniversalTable/UniversalTable'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

type TableItemType = {
  createdAt: string | null | undefined
  endDateOfSubscription: string | null | undefined
  login: string
  paymentStatus: string
  paymentSystem: string
  paymentsId: string
  photo: string
  price: number
  subscriptionType: string
  updatedAt: string | null | undefined
}
type FormatDataTableType = TableItemType[] | undefined

const PaymentsAdmin = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const client = useClient()

  const getSearchValue = () => {
    return inputRef.current?.value
  }
  const initialPageSize = 10
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  console.log(page, pageSize)
  const [getCountPayments, { data: countPayments }] = useLazyQuery(GET_TOTAL_COUNT_PAYMENTS, {
    variables: {
      sortBy: 'createdAt',
      sortDirection,
      pageNumber: page,
      pageSize,
      searchName: getSearchValue() || '',
    },
  })

  const pagesCount = countPayments ? Math.ceil(countPayments.totalCountPayments / 10) : 0

  const [getPayments, { data: payments }] = useLazyQuery(GET_ALL_PAYMENTS, {
    variables: {
      sortBy,
      sortDirection,
      pageNumber: page,
      pageSize,
      searchName: '',
    },
  })

  console.log(payments, countPayments?.totalCountPayments)

  const formatTableData: FormatDataTableType = payments?.allPayments.map(payment => ({
    createdAt: payment.createdAt,
    endDateOfSubscription: payment.endDateOfSubscription,
    paymentStatus: payment.paymentStatus,
    paymentSystem: payment.paymentSystem,
    paymentsId: payment.paymentsId,
    price: payment.price,
    subscriptionType: payment.subscriptionType,
    updatedAt: payment.updatedAt,
    login: payment.user?.profiles?.login ? payment.user.profiles.login : '',
    photo: payment.user?.profiles?.photo ? payment.user.profiles.photo : '',
  }))

  const tableHeadingData: TableHeaderType[] = [
    { table: 'Username', back: '', sort: false, text: 'login', avatar: 'photo' },
    { table: 'Date Added', back: 'createdAt', sort: true },
    { table: 'Amount, $', back: 'price', sort: true },
    { table: 'Subscription', back: 'subscriptionType', sort: true },
    { table: 'Payment Method', back: 'paymentSystem', sort: true },
  ]

  const debouncedSearch = useDebounce(getPayments, 500)

  useEffect(() => {
    getCountPayments()
    getPayments()
  }, [])

  useEffect(() => {
    const input = document.getElementById('search')

    input?.addEventListener('keydown', debouncedSearch)

    return () => input?.removeEventListener('keydown', debouncedSearch)
  }, [getSearchValue])

  const selectedSort = (sortType: string): void => {
    console.log(sortType)
    setSortBy(sortType)

    if (sortDirection === 'desc') {
      setSortDirection('asc')
    } else {
      setSortDirection('desc')
    }
  }

  return (
    <>
      {client && (
        <>
          <WrapperAdmin>
            <SearchBarAdmin>
              <SearchIconAdmin alt="search" src={search} />
              <SearchAdmin ref={inputRef} />
            </SearchBarAdmin>
            <SelectStatusAdmin initialValue="Not Selected" options={['Blocked', 'Not Blocked']} />
          </WrapperAdmin>
          <UniversalTable
            key="createdAt"
            formatTableData={payments?.allPayments ? formatTableData : []}
            selectedSort={selectedSort}
            tableHeadingData={tableHeadingData}
          />
          {payments && (
            <PagesNavigation
              pageNumber={page}
              pagesCount={pagesCount}
              pageSize={pageSize}
              t={t}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </>
      )}
    </>
  )
}

export default PaymentsAdmin
PaymentsAdmin.getLayout = getLayout
