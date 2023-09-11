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

import { NotAuthorization, RefreshTokenResponse } from '../auth/types'

import {
  AllPaymentsResponse,
  AllSubscriptionsResponse,
  CurrentSubscription,
  PaypalResponse,
  StripeResponse,
} from './types'

const statusCode = 401

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://kustogram.site/api/v1/payments',
    credentials: 'include',
    method: 'POST',
    prepareHeaders: (headers, { endpoint }) => contentTypeSetup(headers, { endpoint }, []),
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
        'https://kustogram.site/api/v1/auth/refresh-token',
        api,
        extraOptions
      )

      if (refreshResult.data) {
        const refreshRes = refreshResult as RefreshTokenResponse

        setItem('accessToken', refreshRes.data.accessToken)
        result = await baseQuery(args, api, extraOptions)
      } else {
        console.log('smth went wrong')
      }
    }
  }

  return result
}

export const paymentsApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    stripe: builder.mutation<StripeResponse, unknown>({
      query: body => ({
        url: 'stripe',
        method: 'POST',
        body,
      }),
    }),
    paypal: builder.mutation<PaypalResponse, unknown>({
      query: body => ({
        url: 'paypal',
        method: 'POST',
        body,
      }),
    }),
    allSubscriptions: builder.query<AllSubscriptionsResponse, void>({
      query: () => ({
        url: '',
      }),
    }),
    currentSubscription: builder.query<CurrentSubscription, void>({
      query: () => ({
        url: 'current-subscription',
      }),
    }),
    payments: builder.query<AllPaymentsResponse, void>({
      query: () => ({
        url: 'payments',
      }),
    }),
  }),
})

export const {
  useStripeMutation,
  usePaymentsQuery,
  usePaypalMutation,
  useCurrentSubscriptionQuery,
  useAllSubscriptionsQuery,
} = paymentsApi
