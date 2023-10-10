import { useState, useEffect } from 'react'

import { useLazyGetUserPostsQuery, useLazyGetPostQuery } from 'assets/store/api/posts/postsApi'
import { CreatePostResponse, GetPostResponse } from 'assets/store/api/posts/types'
import { useLazyProfileQuery } from 'assets/store/api/profile/profileApi'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import UserInfo from 'features/admin/UserInfo'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
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

const Following = () => {
  const { t } = useTranslation()

  const baseUrl = '/admin/user'

  return (
    <>
      <UserInfo />
      <TabBar baseUrl={baseUrl} titleList={adminUserTabData} />
      <div>Following</div>
    </>
  )
}

Following.getLayout = getLayout
export default Following
