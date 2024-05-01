import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import referralReducer from './slices/referralSlice';
import { referralApi } from "./slices/referralAPiSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    referral:referralReducer,
    [referralApi.reducerPath]: referralApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(referralApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
