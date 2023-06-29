import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {LoginResponseType, LoginType, RegistrationType} from './types'
import {loadState} from '../../../components/localStorage/localStorage';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    fetchFn: async (url) => {

      const token = loadState('accessToken')

      const options = {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        // body: JSON.stringify(body),
      };

      const response = await fetch(url, options);

      return response
    },
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<undefined, RegistrationType>({
      query: (body) => ({
        url: "auth/registration",
        method: "POST",
        body
      })
    }),
    login: builder.mutation<LoginResponseType, LoginType>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body
      })
    }),
    logout: builder.mutation<undefined, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST"
      })
    }),
  })
})

export const { useRegistrationMutation,useLoginMutation, useLogoutMutation } = authApi
