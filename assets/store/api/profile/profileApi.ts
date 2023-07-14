import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {loadState} from "../../../../common/components/localStorage/localStorage";
import {UserType} from "./types";
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../../../common/components/localStorage/types";
import {AuthMeType} from "pages/profile/settings";
import { nanoid } from "@reduxjs/toolkit";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    prepareHeaders: (headers, { endpoint }) => {

      const UPLOAD_ENDPOINTS = ['saveAvatar'];

      if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
        headers.set("Content-Type", `application/json`);
      }
      const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      headers.set("Authorization", `Bearer ${token}`);
      console.log("HEADERS", headers);

      return headers;
    }
    // fetchFn: async (url) => {
    //
    //   const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
    //
    //   const options = {
    //     // method: 'POST',
    //     headers: new Headers({
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //
    //     }),
    //     // body: JSON.stringify(body),
    //   };
    //
    //   const response = await fetch(url, options);
    //
    //   return response
    // },
  }),
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    profile: builder.query<UserType, void>({
      query: () => ({
        url: "users/profiles/profile",
        method: "GET"
      }),
      providesTags: ["UserInfo"],
    }),
    saveProfileInfo: builder.mutation<any, any>({
      query: (body: UserType) => {
        return {
          method: "POST",
          url: `users/profiles/save-profileInfo`,
          body
        };
      }
    }),
    authMe: builder.query<AuthMeType, void>({
      query: () => ({
        url: "auth/me",
        method: "GET"
      })
    }),
    saveAvatar: builder.mutation<void, FormData>({
      query: (body: FormData) => {
        return {
          method: "POST",
          url: `users/profiles/save-avatar`,
          body: body
        };
      },
      async onQueryStarted(
        // 1 параметр: QueryArg - аргументы, которые приходят в query
        body, 
        // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
        { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            profileApi.util.updateQueryData(
            // 1 параметр: endpointName, который мы выполняем после удачного первого запроса (invalidatesTags)
            "profile",
            // 2 параметр: QueryArgFrom - параметры, которые приходят в endpoint выше
             undefined, 
             // 3 параметр: Коллбек функция. 
             // В данном блоке мы делаем логику, которая должна выполниться синхронно,
             // без необходимости дожидаться ответа от сервера.
             // Говоря проще пишем здесь логику, которую раньше писали в редьюсере,
             // чтобы изменять стейт
             (draft) => {
              Object.assign(draft, {photo: body})
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      invalidatesTags: ["UserInfo"],
    }),
  })
});

export const { useLazyProfileQuery,
  useSaveProfileInfoMutation,
  useLazyAuthMeQuery ,
  useSaveAvatarMutation
} = profileApi;


