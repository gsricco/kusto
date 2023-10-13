import { useEffect, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from 'assets/apollo/users'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import UsersTable from 'common/components/Table/UsersTable'
import { useClient } from 'common/hooks/useClients'
import { useDebounce } from 'common/hooks/useDebounce'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import search from 'public/img/icons/search.svg'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const SelectStatus = () => {
  return (
    <Select defaultValue="Not selected">
      <Option hidden selected>
        Not selected
      </Option>
      <Option>Blocked</Option>
      <Option>Not Blocked</Option>
    </Select>
  )
}

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

  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')

  // const selectdSort = (sortType: string): void => {
  //   if (sortType === 'createdAt') {
  //     setSortDirection('createdAt')
  //   } else {
  //     setSortDirection('username')
  //   }
  // }

  // const checkSelectedSort = () => {
  //   if (sortBy === 'username') {
  //     return 'username'
  //   }

  //   return 'createdAt'
  // }

  // const selectSortDirection = () => {
  //   if (sortDirection === 'desc') {
  //     setSortDirection('asc')
  //   } else {
  //     setSortDirection('desc')
  //   }
  // }

  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, {
    variables: {
      pageSize: 10,
      searchName: getSearchValue() || '',
      sortBy: 'createdAt',
      sortDirection,
      pageNumber: 1,
    },
  })

  const debouncedSearch = useDebounce(getUsers, 500)

  useEffect(() => {
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
        <Wrapper>
          <SearchBar>
            <SearchIcon alt="search" src={search} />
            <Search ref={inputRef} />
          </SearchBar>
          <SelectStatus />
        </Wrapper>
        <UsersTable t={t} users={users} />
      </>
    )
  )
}

export default Admin
Admin.getLayout = getLayout

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

const SearchBar = styled.div`
  position: relative;
  border: 1px solid #8d9094;
  width: 60%;
`
const Search = styled.input.attrs({
  placeholder: 'Search',
  id: 'search',
})`
  border: none;
  background: black;
  color: white;
  padding: 6px 0 6px 40px;
  width: 100%;
  z-index: 10;
`

const SearchIcon = styled(Image)`
  position: absolute;
  top: 6px;
  left: 10px;
`

const Select = styled.select`
  border: 1px solid #fff;
  background: #171717;
  color: white;
  padding: 2px 10px;
`
const Option = styled.option`
  color: white;
  background: #171717;
`
