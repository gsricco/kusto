import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react'
import { setItem } from 'common/hooks/useLocalStorage'
import { contentTypeSetup } from 'common/utils/contentTypeSetup'
import { getBrowserInfo } from 'common/utils/getBrowserInfo'

import { NotAuthorization, RefreshTokenResponse } from '../auth/types'

import {
  CreatePostResponse,
  EditPostRequest,
  GetPostResponse,
  GetUserAllPostsRequest,
  GetUserAllPostsResponse,
  GetUserPostsRequest,
  GetUserPostsResponse,
} from './types'

const statusCode = 401

const browserData = getBrowserInfo()

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1/',
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ['createPost']),
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
    const res = result as NotAuthorization

    if (res.error.originalStatus === statusCode) {
      const refreshResult = await baseQuery(
        {
          url: 'https://kustogram.site/api/v1/auth/refresh-token',
          body: browserData,
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
    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: body => ({
        url: 'post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['createPost'],
    }),
    updatePost: builder.mutation<void, EditPostRequest>({
      query: ({ body, postId }) => ({
        url: `post/${postId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['editPost'],
    }),
    getPost: builder.query<GetPostResponse, string>({
      query: postId => ({
        url: `post/${postId}`,
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
    getUserPosts: builder.query<GetUserPostsResponse, GetUserPostsRequest>({
      query: ({ userId, pageNumber, pageSize }) => ({
        url: `public-posts/user/${userId}}?sortBy=${pageNumber}&pageSize=${pageSize}&sortDirection=${''}`,
        method: 'GET',
      }),
      providesTags: ['deletePost', 'createPost'],
    }),
    getUserAllPosts: builder.query<GetUserAllPostsRequest, unknown>({
      query: ({ idLastUploadedPost, pageSize, sortBy, sortDirection }) => ({
        // url: `posts/user/${idLastUploadedPost}?sortBy=${sortBy}&pageSize=${pageSize}&sortDirection=${sortDirection}`,
        url: `posts/user/`,
        method: 'GET',
      }),
      // providesTags: ['deletePost', 'createPost'],
    }),
  }),
})

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLazyGetPostQuery,
  useLazyGetUserPostsQuery,
  useGetUserPostsQuery,
  useGetPostQuery,
  useGetUserAllPostsQuery,
} = postsApi
