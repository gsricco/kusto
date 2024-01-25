import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { DocumentNode, OperationVariables, useLazyQuery } from '@apollo/client'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { useClient } from 'common/hooks/useClients'
import { useDebounce } from 'common/hooks/useDebounce'
import { filterByStatus } from 'common/utils/filterByStatus'
import { Filtredusers } from 'features/admin/types'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import search from 'public/img/icons/search.svg'
import { useTranslation } from 'react-i18next'

import { TableHeaderType } from '../../common/components/Table/UniversalTable/types'
import { UniversalTable } from '../../common/components/Table/UniversalTable/UniversalTable'
import {
  SearchAdmin,
  SearchBarAdmin,
  SearchIconAdmin,
  WrapperAdmin,
} from '../../features/admin/Admin.styled'
import { SelectStatusAdmin } from '../../features/admin/SelectStatusAdmin'
import PagesNavigation from '../../features/settings/Pagination'
import { GET_USERS } from '../../assets/apollo/users'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UsersPaginationModel } from '../../assets/apollo/__generated__/graphql'

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

  const [selected, setSelected] = useState('Not Selected')
  const [filtredUsers, setFiltredUsers] = useState<Filtredusers[] | []>([])

  const selectedSort = (sortType: string): void => {
    setSortBy(sortType)

    if (sortDirection === 'desc') {
      setSortDirection('asc')
    } else {
      setSortDirection('desc')
    }
  }

  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, {
    variables: {
      // pageSize,
      // searchTerm: getSearchValue() || '',
      // sortBy,
      // sortDirection,
      // pageNumber: page,
    },
  })
  console.log('pagesCount', users?.getUsers.pagination.totalCount)
  const pagesCount = users ? Math.ceil(users.getUsers.pagination.totalCount / 10) : 0

  useEffect(() => {
    if (users) {
      filterByStatus(selected, users, setFiltredUsers)
    }
  }, [selected, users])

  const sortByStatus = (status: string) => {
    if (status === 'Blocked') {
      setSortDirection('desc')
      setSortBy('ban')
    } else if (status === 'Not Blocked') {
      setSortDirection('asc')
      setSortBy('ban')
    } else {
      setSortDirection('desc')
      setSortBy('createdAt')
    }
  }

  // const formatTableData: FormatDataTableType[] | undefined = users?.users
  const tableHeadingData: TableHeaderType[] = [
    { tableTitle: 'User ID', back: '', sort: false, text: 'id', avatar: 'ban' },
    { tableTitle: 'Username', back: 'userName', sort: true },
    { tableTitle: 'Profile Link', back: 'userName', sort: false },
    { tableTitle: 'Date Added', back: 'createdAt', sort: true },
    { tableTitle: '', back: 'noName', sort: false },
  ]

  const debouncedSearch = useDebounce(getUsers, 500)

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)
  }

  useEffect(() => {
    getUsers()
    // getCountUser()
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
          <SelectStatusAdmin
            handleSelect={handleSelect}
            initialValue="Not Selected"
            options={['Blocked', 'Not Blocked']}
            selected={selected}
            sortByStatus={sortByStatus}
          />
        </WrapperAdmin>
        <UniversalTable
          formatTableData={filtredUsers}
          selectedSort={selectedSort}
          tableHeadingData={tableHeadingData}
        />
        {users && (
          <PagesNavigation
            pageNumber={page}
            pagesCount={pagesCount}
            // pagesCount={10}
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
