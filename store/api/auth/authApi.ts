import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Registration } from "./types"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://calypso-one.vercel.app/" }),
  endpoints: (builder) => ({
    registration: builder.mutation<undefined, Registration>({
      query: (body) => ({
        url: "auth/registration",
        method: "POST",
        body
      })
    })
  })
})

export const { useRegistrationMutation } = authApi
