import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { getItem, setItem } from 'common/hooks/useLocalStorage'
import { contentTypeSetup } from 'common/utils/contentTypeSetup'

import { RefreshTokenResponse } from '../auth/types'

import {
  AllPaymentsResponse,
  CurrentSubscription,
  SubscribeRequest,
  SubscribeResponse,
} from './types'

const statusCode = 401

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/v1',
  credentials: 'include',
  method: 'POST',
  prepareHeaders: (headers, { endpoint }) => contentTypeSetup(headers, { endpoint }, []),
})

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

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['getCurentSubscriptions'],
  endpoints: builder => ({
    currentSubscription: builder.query<CurrentSubscription, void>({
      query: () => ({
        url: 'subscriptions/current-subscriptions',
        method: 'GET',
      }),
      providesTags: ['getCurentSubscriptions'],
    }),
    payments: builder.query<AllPaymentsResponse, void>({
      query: () => ({
        url: `subscriptions/my-payments`,
        method: 'GET',
      }),
    }),
    autoReneval: builder.mutation<void, void>({
      query: () => ({
        url: `subscriptions/canceled-auto-renewal`,
      }),
      invalidatesTags: ['getCurentSubscriptions'],
    }),
    subscribe: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: body => ({
        url: `subscriptions`,
        body,
      }),
    }),
  }),
})

export const {
  usePaymentsQuery,
  useCurrentSubscriptionQuery,
  useLazyPaymentsQuery,
  useAutoRenevalMutation,
  useSubscribeMutation,
} = paymentsApi
