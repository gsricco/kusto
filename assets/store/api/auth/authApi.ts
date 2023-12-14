import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem } from 'common/hooks/useLocalStorage'

import {
  CheckLinkType,
  LoginResponseType,
  LoginType,
  MeType,
  NewPasswordResType,
  NewPasswordType,
  RefreshLinkType,
  RegistrationType,
  SendLinkType,
} from './types'
import { profileApi } from '../profile/profileApi'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1',
    credentials: 'include',
    fetchFn: async url => {
      const token = getItem('accessToken')
      const options = {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }

      return fetch(url, options)
    },
  }),
  endpoints: builder => ({
    registration: builder.mutation<unknown, RegistrationType>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    checkLinkHandler: builder.mutation<unknown, CheckLinkType>({
      query: body => {
        return {
          method: 'POST',
          url: `/auth/registration-confirmation`,
          body,
        }
      },
    }),
    refreshLink: builder.mutation<unknown, RefreshLinkType>({
      query: body => {
        return {
          method: 'POST',
          url: `/auth/registration-email-resending`,
          body,
        }
      },
    }),
    login: builder.mutation<LoginResponseType, LoginType>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    loginWithGoogle: builder.mutation<LoginResponseType, { code: string }>({
      query: body => ({
        url: 'auth/google',
        method: 'POST',
        body,
      }),
    }),
    loginWithGithub: builder.mutation<LoginResponseType, { code: string }>({
      query: body => ({
        url: 'auth/github',
        method: 'POST',
        body,
      }),
    }),
    sendRecoveryLink: builder.mutation<unknown, SendLinkType>({
      query: body => ({
        method: 'POST',
        url: `/auth/password-recovery`,
        body,
      }),
    }),
    newPassword: builder.mutation<NewPasswordResType, NewPasswordType>({
      query: body => {
        return {
          method: 'POST',
          url: `/auth/new-password`,
          body,
        }
      },
    }),
    // checkLinkHandler: builder.query<unknown, CheckLinkType>({
    //   query: code => {
    //     return {
    //       method: 'GET',
    //       url: `/auth/email-confirmation/${code}`,
    //     }
    //   },
    // }),

    me: builder.query<MeType, void>({
      query: () => {
        return {
          method: 'GET',
          url: `/auth/me`,
        }
      },
    }),
    profile: builder.query<MeType, void>({
      query: () => {
        return {
          method: 'GET',
          url: `/auth/me`,
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'POST',
          url: `/auth/logout`,
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          localStorage.clear()
          dispatch(profileApi.util.resetApiState())
        } catch {
          console.log('value')
        }
      },
    }),
  }),
})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useSendRecoveryLinkMutation,
  useNewPasswordMutation,
  // useLazyCheckLinkHandlerQuery,
  useCheckLinkHandlerMutation,
  useRefreshLinkMutation,
  useLazyMeQuery,
  useLogoutMutation,
  useLoginWithGoogleMutation,
  useLoginWithGithubMutation,
} = authApi
