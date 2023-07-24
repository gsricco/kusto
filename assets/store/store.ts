import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/auth/authApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import {profileApi} from './api/profile/profileApi';
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware)
})

// setupListeners(store.dispatch)

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
