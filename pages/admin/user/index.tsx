import { useState, useEffect } from 'react'

import { useLazyGetUserPostsQuery, useLazyGetPostQuery } from 'assets/store/api/posts/postsApi'
import { CreatePostResponse, GetPostResponse } from 'assets/store/api/posts/types'
import { useLazyProfileQuery } from 'assets/store/api/profile/profileApi'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import Post from 'common/components/Post/Post'
import { TabBar } from 'common/components/TabBar'
import UserInfo from 'features/admin/UserInfo'
import ProfileElement from 'features/profile/ProfileElement'
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

// const postsAmount = 9

const UserPhoto = () => {
  //   const [getProfileInfo, { data: user, status: userStatus }] = useLazyProfileQuery()
  //   const [getUserPosts, { data, isLoading, status }] = useLazyGetUserPostsQuery()

  //   const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery()
  //   const [isPostActive, setIsPostActive] = useState(false)

  //   const [pageNumber, setPageNumber] = useState(1)
  //   const [pageSize, setPageSize] = useState(postsAmount)
  //   const [pageCount, setPageCount] = useState(1)
  //   const [userId, setUserId] = useState('')
  //   // const [postInfo, setPostInfo] = useState<GetPostResponse | undefined>()
  //   const [totalCount, setTotalCount] = useState(postsAmount)

  //   const [isFetching, setIsFetching] = useState(true)

  //   const posts = data?.items || []

  const { t } = useTranslation()

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

  //   useEffect(() => {
  //     getProfileInfo()
  //       .unwrap()
  //       .then(res => {
  //         if (res.userId) {
  //           setUserId(res.userId)
  //         }
  //       })
  //   }, [])

  //   useEffect(() => {
  //     if (userId && isFetching && posts.length < totalCount) {
  //       getUserPosts({ userId, pageNumber, pageSize })
  //         .unwrap()
  //         .then(res => {
  //           setPageCount(res.pagesCount)
  //           setPageSize(prev => prev + postsAmount)
  //           setIsFetching(false)
  //           setTotalCount(res.totalCount)
  //         })
  //     }
  //   }, [isFetching, userId])

  //   const scrollHandler = () => {
  //     const { scrollHeight } = document.documentElement
  //     const { scrollTop } = document.documentElement
  //     const { innerHeight } = window

  //     if (scrollHeight - (scrollTop + innerHeight) < 100 && posts.length < totalCount) {
  //       setIsFetching(true)
  //     }
  //   }

  //   useEffect(() => {
  //     document.addEventListener('scroll', scrollHandler)

  //     return () => document.removeEventListener('scroll', scrollHandler)
  //   }, [totalCount])

  return (
    <>
      <UserInfo />
      <TabBar baseUrl={baseUrl} titleList={adminUserTabData} />
      <div>PhotoList</div>

      {/* <ProfileElement t={t} user={user} />
      <PostsWrapper>
        {posts.map(post => {
          return (
            <PostPreview
              key={post.id}
              alt="post image"
              height={350}
              src={post?.images[0]?.url || postWithoutImage}
              width={350}
              onClick={() =>
                getCurrentPost(post.id)
                  .unwrap()
                  .then(() => setIsPostActive(true))
              }
            />
          )
        })}
      </PostsWrapper>

      {isPostActive && (
        <Post login={user?.login || ''} postInfo={postInfo} setIsPostActive={setIsPostActive} />
      )} */}
    </>
  )
}

UserPhoto.getLayout = getLayout
export default UserPhoto

const PostsWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-bottom: 20px;
  /* padding-top: 53px;
  padding-right: 24px; */

  @media (max-width: 960px) {
    padding-left: 10px;
  }
`

const PostPreview = styled(Image)`
  width: calc(33.33% - 10px);
  object-fit: cover;
  cursor: pointer;

  @media (max-width: 560px) {
    width: calc(33.33% - 10px);
  }
`
