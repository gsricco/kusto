import { useState, useEffect } from 'react'

import { postsApi } from 'assets/store/api/posts/postsApi'
import { GetUserPostsResponse } from 'assets/store/api/posts/types'
import { profileApi } from 'assets/store/api/profile/profileApi'
import { UserType } from 'assets/store/api/profile/types'
import { store } from 'assets/store/store'
import ProfileElement from 'features/profile/ProfileElement'
import { GetServerSidePropsContext } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import postWithoutImage from 'public/img/404.svg'
import { styled } from 'styled-components'

import { getLayout } from '../../../common/components/Layout/PageLayout/PageLayout'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const accessToken = cookies().get('refreshToken')?.value

  console.log(context.req.cookies.refreshToken)
  let userData = null
  const userId = null
  //   let postsData = null

  try {
    const userResponse = await store.dispatch(profileApi.endpoints.profile.initiate())

    console.log(userResponse)
    if (userResponse.data) {
      userData = userResponse.data as UserType
    }

    // if (userData) {
    //   userId = userData.userId
    // }
    // if (userId) {
    //   const postsResponse = await store.dispatch(
    //     postsApi.endpoints.getUserPosts.initiate({ userId, pageNumber: 1, pageSize: 9 })
    //   )

    //   if (postsResponse.data) {
    //     postsData = postsResponse.data as GetUserPostsResponse
    //   }
    // }
  } catch (e) {
    console.log(e)
  }
  const { locale } = context

  return {
    props: {
      userData,
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

type ServerPropsType = {
  //   postsData: GetUserPostsResponse | null
  userData: UserType | null
}
const MyProfile = ({ userData }: ServerPropsType) => {
  console.log(userData)
  const postsData = { items: [] }
  const posts = postsData?.items || []

  const { t } = useTranslation()

  return (
    <>
      {}
      <ProfileElement t={t} user={userData} />
      <PostsWrapper>
        {posts.map(post => {
          return (
            <PostPreview
              key="1"
              alt="post image"
              height={350}
              src={postWithoutImage}
              width={350}
              onClick={() => console.log('click')}
            />
          )
        })}
      </PostsWrapper>
    </>
  )
}

MyProfile.getLayout = getLayout
export default MyProfile

const PostsWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-bottom: 20px;
  /* padding-top: 53px;
  padding-right: 24px; */
`

const PostPreview = styled(Image)`
  width: calc(33.33% - 10px);
  object-fit: cover;
  cursor: pointer;
`
