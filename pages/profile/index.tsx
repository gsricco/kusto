import { useState, useEffect } from 'react'

import {
  useLazyGetUserPostsQuery,
  useLazyGetPostQuery,
  postsApi,
} from 'assets/store/api/posts/postsApi'
import {
  CreatePostResponse,
  GetPostResponse,
  GetUserPostsResponse,
} from 'assets/store/api/posts/types'
import { profileApi, useLazyProfileQuery } from 'assets/store/api/profile/profileApi'
import { UserType } from 'assets/store/api/profile/types'
import { store } from 'assets/store/store'
import Post from 'common/components/Post/Post'
import ProfileElement from 'features/profile/ProfileElement'
import { GetServerSidePropsContext, GetStaticPropsContext, NextPage } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import postWithoutImage from 'public/img/404.svg'
import { styled } from 'styled-components'

import { getLayout } from '../../common/components/Layout/PageLayout/PageLayout'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const fakeData = {
  //   email: 'Zdobnovaea@gmail.com',
  //   password: 'cool1120',
  //   browserName: 'firefox',
  //   deviceName: 'notebook',
  //   ip: '66:77:88:99',
  // }
  // // const accessToken = cookies().get('refreshToken')?.value
  let userData = null
  let userId = null
  let postsData = null

  try {
    const userResponse = await store.dispatch(profileApi.endpoints.profile.initiate())

    console.log(userResponse)
    if (userResponse.data) {
      userData = userResponse.data as UserType
    }
    if (userData) {
      userId = userData.userId
    }
    if (userId) {
      const postsResponse = await store.dispatch(
        postsApi.endpoints.getUserPosts.initiate({ userId, pageNumber: 1, pageSize: 9 })
      )

      if (postsResponse.data) {
        postsData = postsResponse.data as GetUserPostsResponse
      }
    }
  } catch (e) {
    console.log(e)
  }
  const { locale } = context

  return {
    props: {
      userData,
      postsData,
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const postsAmount = 9

type ServerPropsType = {
  postsData: GetUserPostsResponse | null
  userData: UserType | null
}
const MyProfile = ({ userData, postsData }: ServerPropsType) => {
  console.log(userData)
  console.log(postsData)

  const [getProfileInfo, { data: user, status: userStatus }] = useLazyProfileQuery()
  const [getUserPosts, { data, isLoading, status }] = useLazyGetUserPostsQuery()

  // const [posts, setPosts] = useState<CreatePostResponse[]>([])
  // const totalCount = data?.totalCount || 0

  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsAmount)
  const [pageCount, setPageCount] = useState(1)
  const [userId, setUserId] = useState(userData?.photo)
  // const [postInfo, setPostInfo] = useState<GetPostResponse | undefined>()
  const [totalCount, setTotalCount] = useState(postsAmount)

  const [isFetching, setIsFetching] = useState(true)

  const posts = postsData?.items || []

  const { t } = useTranslation()

  // useEffect(() => {
  //   getProfileInfo()
  //     .unwrap()
  //     .then(res => {
  //       if (res.userId) {
  //         setUserId(res.userId)
  //       }
  //     })
  // }, [])

  useEffect(() => {
    if (userId && isFetching && posts.length < totalCount) {
      getUserPosts({ userId, pageNumber, pageSize })
        .unwrap()
        .then(res => {
          setPageCount(res.pagesCount)
          setPageSize(prev => prev + postsAmount)
          setIsFetching(false)
          setTotalCount(res.totalCount)
        })
    }
  }, [isFetching])

  const scrollHandler = () => {
    const { scrollHeight } = document.documentElement
    const { scrollTop } = document.documentElement
    const { innerHeight } = window

    if (scrollHeight - (scrollTop + innerHeight) < 100 && posts.length < totalCount) {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler)
  }, [totalCount])

  return (
    <>
      {}
      <ProfileElement t={t} user={userData} />
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

      {isPostActive && <Post postInfo={postInfo} setIsPostActive={setIsPostActive} />}
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
