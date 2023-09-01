import { useState, useEffect } from 'react'

import { useLazyGetUserPostsQuery, useLazyGetPostQuery } from 'assets/store/api/posts/postsApi'
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const postsAmount = 9
const higAltitude = 1500

const MyProfile = () => {
  const [getProfileInfo, { data: user }] = useLazyProfileQuery()
  const [getUserPosts] = useLazyGetUserPostsQuery()

  const [posts, setPosts] = useState<CreatePostResponse[]>([])
  // const totalCount = data?.totalCount || 0

  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsAmount)
  const [pageCount, setPageCount] = useState(1)
  const [userId, setUserId] = useState('')
  // const [postInfo, setPostInfo] = useState<GetPostResponse | undefined>()
  const [totalCount, setTotalCount] = useState(postsAmount)

  const [isFetching, setIsFetching] = useState(true)

  const { t } = useTranslation()

  useEffect(() => {
    getProfileInfo()
      .unwrap()
      .then(({ userId }) => {
        if (userId) {
          setUserId(userId)
        }
      })
  }, [])

  useEffect(() => {
    if (userId && isFetching && posts.length < totalCount) {
      getUserPosts({ userId, pageNumber, pageSize })
        .unwrap()
        .then(res => {
          setPosts(res.items)
          setPageCount(res.pagesCount)
          setPageSize(prev => prev + postsAmount)
          setIsFetching(false)
          setTotalCount(res.totalCount)
        })
    }

    if (posts.length === totalCount) {
      const postsWrapper = document.getElementById('postsWrapper')

      if (postsWrapper) {
        postsWrapper.style.paddingBottom = '20px'
      }
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

  const checkDeviceHeight = () => {
    if (window.innerHeight > higAltitude) {
      return '300px'
    }

    return '20px'
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler)
  }, [totalCount])

  useEffect(() => {
    const postsWrapper = document.getElementById('postsWrapper')

    if (postsWrapper) {
      postsWrapper.style.paddingBottom = checkDeviceHeight()
    }
  }, [])

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
      {isPostActive && <Post postInfo={postInfo} setIsPostActive={setIsPostActive} />}
    </>
  )
}

MyProfile.getLayout = getLayout
export default MyProfile

const PostsWrapper = styled.div.attrs({
  id: 'postsWrapper',
})`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 20px;
  padding: 53px 20px 20px;
`

const PostPreview = styled(Image)`
  width: 32%;
  object-fit: cover;
`
