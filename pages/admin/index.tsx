import { useEffect, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { GET_TOTAL_COUNT, GET_USERS } from 'assets/apollo/users'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import UsersTable from 'common/components/Table/UsersTable'
import { useClient } from 'common/hooks/useClients'
import { useDebounce } from 'common/hooks/useDebounce'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import search from 'public/img/icons/search.svg'
import { useTranslation } from 'react-i18next'

import {
  SearchAdmin,
  SearchBarAdmin,
  SearchIconAdmin,
  WrapperAdmin,
} from '../../features/admin/Admin.styled'
import { SelectStatusAdmin } from '../../features/admin/SelectStatusAdmin'
import PagesNavigation from '../../features/settings/Pagination'
import {
  TableHeaderType,
  UniversalTable,
} from '../../common/components/Table/UniversalTable/UniversalTable'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const Admin = () => {
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

  const selectedSort = (sortType: string): void => {
    if (sortType === 'Date Added') {
      if (sortDirection === 'desc') {
        setSortDirection('asc')
      } else {
        setSortDirection('desc')
      }
      setSortBy('createdAt')
    } else {
      if (sortDirection === 'desc') {
        setSortDirection('asc')
      } else {
        setSortDirection('desc')
      }
      setSortBy('login')
    }
  }

  const [getCountUser, { data: countUser }] = useLazyQuery(GET_TOTAL_COUNT, {
    variables: {
      pageSize,
      searchName: getSearchValue() || '',
      sortBy,
      sortDirection,
      pageNumber: page,
    },
  })

  const pagesCount = countUser ? Math.ceil(countUser.totalCountUsers / 10) : 0

  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, {
    variables: {
      pageSize,
      searchName: getSearchValue() || '',
      sortBy,
      sortDirection,
      pageNumber: page,
    },
  })
  console.log(users)

  const formatTableData = users?.users
  const tableHeadingData: TableHeaderType[] = [
    { table: 'User ID', back: '', sort: false, text: 'id', avatar: 'ban' },
    { table: 'Username', back: 'login', sort: true },
    { table: 'Profile Link', back: 'login', sort: false },
    { table: 'Date Added', back: 'createdAt', sort: true },
    { table: '', back: 'paymentSystem', sort: false },
  ]

  const debouncedSearch = useDebounce(getUsers, 500)

  useEffect(() => {
    getUsers()
    getCountUser()
  }, [])

  useEffect(() => {
    const input = document.getElementById('search')

    input?.addEventListener('keydown', debouncedSearch)

    return () => input?.removeEventListener('keydown', debouncedSearch)
  }, [getSearchValue])

  return (
    client && (
      <>
        <WrapperAdmin>
          <SearchBarAdmin>
            <SearchIconAdmin alt="search" src={search} />
            <SearchAdmin ref={inputRef} />
          </SearchBarAdmin>
          <SelectStatusAdmin initialValue="Not Selected" options={['Blocked', 'Not Blocked']} />
        </WrapperAdmin>
        {/*
        <UsersTable selectedSort={selectedSort} users={users} />
*/}
        <UniversalTable
          key="createdAt"
          formatTableData={formatTableData}
          menu={true}
          selectedSort={selectedSort}
          tableHeadingData={tableHeadingData}
        />
        {users && (
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
    )
  )
}

export default Admin
Admin.getLayout = getLayout
