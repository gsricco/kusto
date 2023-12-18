import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react'
import { getItem, setItem } from 'common/hooks/useLocalStorage'
import { contentTypeSetup } from 'common/utils/contentTypeSetup'
import { getBrowserInfo } from 'common/utils/getBrowserInfo'

import { NotAuthorization, RefreshTokenResponse } from '../auth/types'

import {
  CreatePostDescriptionRequest,
  CreatePostDescriptionResponse,
  CreatePostImagesResponse,
  // CreatePostResponse,
  EditPostRequest,
  GetPostResponse,
  GetUserAllPostsRequest,
  GetUserAllPostsResponse,
  // GetUserPostsRequest,
  // GetUserPostsResponse,
} from './types'

const statusCode = 401

// const browserData = getBrowserInfo()

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1/',
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ['createPost', 'createPostImages']),
  }),
  {
    maxRetries: 1,
  }
)

const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    const res = result as { error: { status: number } }

    if (res.error.status === statusCode) {
      const accessToken = getItem('accessToken')
      const refreshResult = await baseQuery(
        {
          url: 'https://inctagram.work/api/v1/auth/update-tokens',
          body: { accessToken },
          method: 'POST',
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        const refreshRes = refreshResult as RefreshTokenResponse

        setItem('accessToken', refreshRes.data.accessToken)
        result = await baseQuery(args, api, extraOptions)
      } else {
        const { origin } = window.location

        window.location.replace(`${origin}/auth/login`)
      }
    }
  }

  return result
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['editPost', 'deletePost', 'createPost'],
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostDescriptionResponse, CreatePostDescriptionRequest>({
      query: body => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['createPost'],
    }),
    createPostImages: builder.mutation<CreatePostImagesResponse, FormData>({
      query: body => ({
        url: 'posts/image',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['createPost'],
    }),
    // createPostDescription: builder.mutation<CreatePostResponse, FormData>({
    //   query: body => ({
    //     url: 'posts',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['createPost'],
    // }),
    //

    updatePost: builder.mutation<void, EditPostRequest>({
      query: ({ body, postId }) => ({
        url: `post/${postId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['editPost'],
    }),
    getPost: builder.query<GetPostResponse, number>({
      query: postId => ({
        url: `posts/p/${postId}`,
        method: 'GET',
      }),
      providesTags: ['editPost'],
    }),
    deletePost: builder.mutation<void, string>({
      query: postId => ({
        url: `post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deletePost'],
    }),
    // getUserPosts: builder.query<GetUserPostsResponse, GetUserPostsRequest>({
    //   query: ({ userId, pageNumber, pageSize }) => ({
    //     url: `public-posts/user/${userId}}?sortBy=${pageNumber}&pageSize=${pageSize}&sortDirection=${''}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['deletePost', 'createPost'],
    // }),
    getUserAllPosts: builder.query<GetUserAllPostsResponse, GetUserAllPostsRequest>({
      query: ({ idLastUploadedPost, pageSize, sortBy, sortDirection }) => ({
        // url: `posts/user/${idLastUploadedPost}?sortBy=${sortBy}&pageSize=${pageSize}&sortDirection=${sortDirection}`,
        url: `posts/user/`,
        method: 'GET',
      }),
      providesTags: ['deletePost', 'createPost'],
    }),
  }),
})

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLazyGetPostQuery,
  // useLazyGetUserPostsQuery,
  // useGetUserPostsQuery,
  useGetPostQuery,
  useGetUserAllPostsQuery,
  useCreatePostImagesMutation,
} = postsApi
