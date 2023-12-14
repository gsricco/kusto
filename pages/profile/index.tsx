import { useState, useEffect } from 'react'

import {
  useLazyGetUserPostsQuery,
  useLazyGetPostQuery,
  useGetPostQuery,
  useGetUserPostsQuery,
  useGetUserAllPostsQuery,
} from 'assets/store/api/posts/postsApi'
import { CreatePostResponse, GetPostResponse } from 'assets/store/api/posts/types'
import { useLazyProfileQuery } from 'assets/store/api/profile/profileApi'
import Post from 'common/components/Post/Post'
import ProfileElement from 'features/profile/ProfileElement'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import postWithoutImage from 'public/img/404.svg'
import { styled } from 'styled-components'

import { getLayout } from '../../common/components/Layout/PageLayout/PageLayout'
import { codeCheckLink } from '../../common/utils/codeCheckLink'
import { getItem } from '../../common/hooks/useLocalStorage'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const postsAmount = 9

const MyProfile = () => {
  // const { resultName: profileId } = codeCheckLink('profileId')
  const [getProfileInfo, { data: user, status: userStatus }] = useLazyProfileQuery()
  const [getUserPosts, { data, isLoading, status }] = useLazyGetUserPostsQuery()

  // const [posts, setPosts] = useState<CreatePostResponse[]>([])
  // const totalCount = data?.totalCount || 0

  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsAmount)
  const [pageCount, setPageCount] = useState(1)
  const [userId, setUserId] = useState<number>(0)
  // const [postInfo, setPostInfo] = useState<GetPostResponse | undefined>()
  const [totalCount, setTotalCount] = useState(postsAmount)

  const [isFetching, setIsFetching] = useState(true)

  // const posts = data?.items || []

  const { t } = useTranslation()
  // eslint-disable-next-line no-magic-numbers
  const { data: data1, status: status1 } = useGetUserAllPostsQuery({})
  console.log('post', data1, status1)
  const posts = data1?.items || []

  useEffect(() => {
    getProfileInfo(getItem('userId'))
      .unwrap()
      .then(res => {
        if (res.userId) {
          setUserId(res.userId as number)
        }
      })
  }, [])

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
  }, [isFetching, userId])

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
      <ProfileElement t={t} user={user} />
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
        <Post
          login={(user?.login as string) || ''}
          postInfo={postInfo}
          setIsPostActive={setIsPostActive}
        />
      )}
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
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  cursor: pointer;

  @media (max-width: 560px) {
    width: calc(33.33% - 10px);
  }
`
