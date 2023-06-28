import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://calypso-one.vercel.app'
export const passwordRecoveryApi: any = createApi({
    reducerPath: 'passwordRecoveryApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (build) => { 
        return {
        // 1 параметр - тип того, что возвращает сервер (ResultType)
        // 2 параметр - тип query аргументов (QueryArg)
          sendRecoveryLink: build.mutation<any, SendRecoveryLinkType>({
            query: (email) => {
              console.log(email);
              return {
                method: "POST",
                url: `/auth/password-recovery`,
                body: {
                  email: email,
                },
              };
            },
          }),
          postNewPassword: build.mutation<any, PostNewPasswordType>({
            query: ({newPassword, recoveryCode}) => {
              return {
                method: "POST",
                url: `/auth/new-password`,
                body: {
                  newPassword: newPassword,
                  recoveryCode: recoveryCode
                },
              };
            },
          }),
        };
      },
})

export const { useSendRecoveryLinkMutation, usePostNewPasswordMutation } = passwordRecoveryApi

type PostNewPasswordType = {
  newPassword: string
  recoveryCode: string
}

type SendRecoveryLinkType = {
    email: string
}