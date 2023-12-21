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

import { AuthMeType, SaveProfileInfoType, UserProfileType, UserType } from './types'

const statusCode = 401

// const browserData = getBrowserInfo()

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1',
    credentials: 'include',
    method: 'POST',
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ['saveAvatar']),
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

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['UserInfo'],
  endpoints: builder => ({
    // profile: builder.query<UserType, void>({
    //   query: () => ({
    //     url: 'users/profiles/profile',
    //     method: 'GET',
    //   }),
    //   providesTags: ['UserInfo'],
    // }),
    profile: builder.query<UserProfileType, number>({
      query: (userId: number) => ({
        // url: `users/profile/${userId}`,
        url: `users/profile`,
        method: 'GET',
      }),
      providesTags: ['UserInfo'],
    }),
    saveProfileInfo: builder.mutation<unknown, SaveProfileInfoType>({
      query: body => {
        return {
          method: 'PUT',
          url: `users/profile`,
          body,
        }
      },
    }),
    authMe: builder.query<AuthMeType, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    }),
    deleteAvatar: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'DELETE',
          url: `users/profile/avatar`,
        }
      },
    }),
    saveAvatar: builder.mutation<void, FormData>({
      query: (body: FormData) => {
        return {
          method: 'POST',
          url: `users/profile/avatar`,
          body,
        }
      },
      // async onQueryStarted(body, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     profileApi.util.updateQueryData('profile', undefined, draft => {
      //       const file = URL.createObjectURL(body.entries().next().value[1])

      //       Object.assign(draft || {}, { photo: file })
      //     })
      //   )

      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },
      invalidatesTags: ['UserInfo'],
    }),
  }),
})

export const {
  useLazyProfileQuery,
  useSaveProfileInfoMutation,
  useLazyAuthMeQuery,
  useSaveAvatarMutation,
  useProfileQuery,
  useAuthMeQuery,
  useDeleteAvatarMutation,
} = profileApi
