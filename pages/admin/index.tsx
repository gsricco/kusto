import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { SelectChangeEvent, selectClasses } from '@mui/material'
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

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)
  }

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

  const [getAllUsers, { data: allUsers }] = useLazyQuery(GET_USERS, {
    variables: {
      pageSize: 10000,
      searchName: '',
      sortBy: 'createdAt',
      sortDirection,
      pageNumber: 1,
    },
  })
  const pagesCount = allUsers ? Math.ceil(allUsers.users.length / 10) : 0

  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, {
    variables: {
      pageSize,
      searchName: getSearchValue() || '',
      sortBy,
      sortDirection,
      pageNumber: page,
    },
  })

  const debouncedSearch = useDebounce(getUsers, 500)

  useEffect(() => {
    getAllUsers()
    getUsers()
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
        <UsersTable selectedSort={selectedSort} users={users} />
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
