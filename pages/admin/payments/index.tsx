import { useEffect, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'

import { GET_ALL_PAYMENTS, GET_TOTAL_COUNT_PAYMENTS } from '../../../assets/apollo/users'
import {
  FormatDataTableType,
  TableHeaderType,
} from '../../../common/components/Table/UniversalTable/types'
import { UniversalTable } from '../../../common/components/Table/UniversalTable/UniversalTable'
import {
  CheckBoxPay,
  CheckBoxPayWrapper,
  CheckBoxTitle,
} from '../../../common/components/Table/UniversalTable/UniversalTable.styled'
import { useClient } from '../../../common/hooks/useClients'
import { useDebounce } from '../../../common/hooks/useDebounce'
import {
  SearchAdmin,
  SearchBarAdmin,
  SearchIconAdmin,
  WrapperAdmin,
} from '../../../features/admin/Admin.styled'
import PagesNavigation from '../../../features/settings/Pagination'
import search from '../../../public/img/icons/search.svg'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

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
  const [isAutoubdate, setIsAutoubdate] = useState(false)

  // const [getCountPayments, { data: countPayments }] = useLazyQuery(GET_TOTAL_COUNT_PAYMENTS, {
  //   variables: {
  //     sortBy,
  //     sortDirection,
  //     pageNumber: page,
  //     pageSize,
  //     searchName: getSearchValue() || '',
  //   },
  // })

  const [getPayments, { data: payments }] = useLazyQuery(GET_ALL_PAYMENTS, {
    variables: {
      sortBy,
      sortDirection,
      pageNumber: page,
      pageSize,
      searchName: '',
    },
  })

  const pagesCount = payments ? Math.ceil(payments.getAllPayments.totalCount / 10) : 0

  const formatTableData: FormatDataTableType[] | undefined = payments?.getAllPayments.items.map(
    payment => ({
      createdAt: payment.createdAt,
      endDateOfSubscription: payment.paymentMethod,
      paymentStatus: payment.type,
      paymentSystem: payment.type,
      paymentsId: payment.id,
      price: payment.amount,
      subscriptionType: payment.currency,
      updatedAt: payment.createdAt,
      login: payment.userName ? payment.userName : '',
      photo: payment.avatars[1]?.url ? payment.avatars[1].url : '',
    })
  )

  const tableHeadingData: TableHeaderType[] = [
    { tableTitle: 'Username', back: '', sort: false, text: 'login', avatar: 'photo' },
    { tableTitle: 'Date Added', back: 'createdAt', sort: true },
    { tableTitle: 'Amount, $', back: 'price', sort: true },
    { tableTitle: 'Subscription', back: 'subscriptionType', sort: true },
    { tableTitle: 'Payment Method', back: 'paymentSystem', sort: true },
  ]

  const debouncedSearch = useDebounce(getPayments, 500)

  useEffect(() => {
    // getCountPayments()
    getPayments()
  }, [])

  useEffect(() => {
    const input = document.getElementById('search')

    input?.addEventListener('keydown', debouncedSearch)

    return () => input?.removeEventListener('keydown', debouncedSearch)
  }, [getSearchValue])

  const selectedSort = (sortType: string): void => {
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
          <CheckBoxPayWrapper>
            <CheckBoxPay
              checked={isAutoubdate}
              type="checkbox"
              onChange={() => {
                setIsAutoubdate(prev => !prev)
              }}
            />
            <CheckBoxTitle>Autoubdate</CheckBoxTitle>
          </CheckBoxPayWrapper>
          {isAutoubdate && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                color: 'red',
                fontSize: '20px',
              }}
            >
              Надо сделать АВТОАБДЕЙТ
            </div>
          )}

          <WrapperAdmin>
            <SearchBarAdmin>
              <SearchIconAdmin alt="search" src={search} />
              <SearchAdmin ref={inputRef} />
            </SearchBarAdmin>
          </WrapperAdmin>
          <UniversalTable
            formatTableData={payments?.getAllPayments.items ? formatTableData : []}
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
