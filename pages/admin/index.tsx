import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import styled from 'styled-components'
import Image from 'next/image'
import search from 'public/img/icons/search.svg'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'common/hooks/useDebounce'
import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from 'assets/apollo/users'
import { Table } from 'styles/styledComponents/payments/payments.styled'
import PaymentsTable from 'common/components/Table/Table'
import UsersTable from 'common/components/Table/UsersTable'
import { useTranslation } from 'react-i18next'
import { useClient } from 'common/hooks/useClients'

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

  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, {
    variables: {
      pageSize: 20,
      searchName: getSearchValue() || '',
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
  }, [debouncedSearch])

  return (
    <>
      <Wrapper>
        <SearchBar>
          <SearchIcon alt="search" src={search} />
          <Search ref={inputRef} />
        </SearchBar>
        <Select defaultValue="Not selected">
          <Option hidden selected>
            Not selected
          </Option>
          <Option>Blocked</Option>
          <Option>Not Blocked</Option>
        </Select>
      </Wrapper>
      <UsersTable t={t} users={users} />
    </>
  )
}

export default Admin
Admin.getLayout = getLayout

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
