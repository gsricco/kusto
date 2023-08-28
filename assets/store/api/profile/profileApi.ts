import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { contentTypeSetup } from 'common/utils/contentTypeSetup'

import { AuthMeType, SaveProfileInfoType, UserType } from './types'

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://calypso-one.vercel.app/',
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ['saveAvatar']),
  }),
  {
    maxRetries: 2,
  }
)

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: staggeredBaseQuery,
  tagTypes: ['UserInfo'],
  endpoints: builder => ({
    profile: builder.query<UserType, void>({
      query: () => ({
        url: 'users/profiles/profile',
        method: 'GET',
      }),
      providesTags: ['UserInfo'],
    }),
    saveProfileInfo: builder.mutation<unknown, SaveProfileInfoType>({
      query: (body: UserType) => {
        return {
          method: 'POST',
          url: `users/profiles/save-profileInfo`,
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
    saveAvatar: builder.mutation<void, FormData>({
      query: (body: FormData) => {
        return {
          method: 'POST',
          url: `users/profiles/save-avatar`,
          body,
        }
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('profile', undefined, draft => {
            const file = URL.createObjectURL(body.entries().next().value[1])

            Object.assign(draft || {}, { photo: file })
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
} = profileApi
