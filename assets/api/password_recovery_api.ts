import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://calypso-one.vercel.app'
export const passwordRecoveryApi: any = createApi({
    reducerPath: 'passwordRecoveryApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (build) => { 
        return {
        // 1 параметр - тип того, что возвращает сервер (ResultType)
        // 2 параметр - тип query аргументов (QueryArg)
          getIsEmail: build.mutation<any, string>({
            query: (email) => {
              return {
                method: "POST",
                url: `/auth/password-recovery`,
                params: {
                  email: email,
                },
              };
            },
          }),
        };
      },
})

export const { useGetIsEmailMutation } = passwordRecoveryApi