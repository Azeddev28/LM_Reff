import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import referralReducer from './slices/referralSlice';
import referralSlice from "./slices/referralSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    referral:referralReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
