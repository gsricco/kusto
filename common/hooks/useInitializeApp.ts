import { appActions } from "../../assets/store/app-reducer";
import { useMeQuery } from "../../assets/store/api/auth/authApi";
import { useEffect } from "react";
import { MeType } from "../../assets/store/api/auth/types";
import { batch } from "react-redux";
import { useAppDispatch } from ".";
import { useActions } from "./useActions";

export const useInitializeApp = () => {
  const dispatch = useAppDispatch();
  const { data: me, isLoading, error } = useMeQuery();
  useEffect(() => {
    switch (true) {
      case isLoading:
        batch(() => {
          dispatch(appActions.setIsLoading({ isLoading: true }));
        });
        break;
      case !!me:
        batch(() => {
          dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
          dispatch(appActions.setUser({ me: me as MeType }));
          dispatch(appActions.setIsLoading({ isLoading: false }));
        });
        break;
      case !!error:
        batch(() => {
          dispatch(appActions.setError({ error: error as string }));
          dispatch(appActions.setIsAppInitialized({ isAppInitialized: false }));
          dispatch(appActions.setIsLoading({ isLoading: false }));
        });
      default:
        break;
    }
  }, [me, isLoading, error, dispatch]);
};
