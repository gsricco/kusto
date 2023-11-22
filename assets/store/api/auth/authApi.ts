import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem } from 'common/hooks/useLocalStorage'

import {
  CheckLinkResType,
  CheckLinkType,
  LoginResponseType,
  LoginType,
  MeType,
  // NewPasswordResType,
  NewPasswordType,
  RefreshLinkType,
  RegistrationType,
  SendLinkType,
} from './types'

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

      // return await fetch(url, options)
      return fetch(url, options)
    },
  }),
  endpoints: builder => ({
    registration: builder.mutation<void, RegistrationType>({
      query: body => ({
        url: 'auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<LoginResponseType, LoginType>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    // loginWithGoogle: builder.mutation<LoginResponseType, { code: string }>({
    //   query: body => ({
    //     url: 'auth/google',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // loginWithGithub: builder.mutation<LoginResponseType, { code: string }>({
    //   query: body => ({
    //     url: 'auth/github',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    sendRecoveryLink: builder.mutation<void, SendLinkType>({
      query: body => ({
        method: 'POST',
        url: `/auth/password-recovery`,
        body,
      }),
    }),
    newPassword: builder.mutation<void, NewPasswordType>({
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
    checkLinkHandler: builder.mutation<CheckLinkResType, CheckLinkType>({
      query: body => {
        return {
          method: 'POST',
          url: `/auth/check-recovery-code`,
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
    me: builder.query<MeType, void>({
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
    }),
  }),
})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useSendRecoveryLinkMutation,
  useNewPasswordMutation,
  // useLazyCheckLinkHandlerQuery,
  useRefreshLinkMutation,
  useLazyMeQuery,
  useLogoutMutation,
  useCheckLinkHandlerMutation,
  // useLoginWithGoogleMutation,
  // useLoginWithGithubMutation,
} = authApi
