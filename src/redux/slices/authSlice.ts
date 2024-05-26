import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRoute } from "../../api/BackendRoutes";
import { baseQueryWithReauth } from "../../utils/apiUtils";

const baseUrl = import.meta.env.VITE_URL;

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery:baseQueryWithReauth(baseUrl), // [UPDATED]
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: getRoute('login'),
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url:  getRoute('resetPassword'),
        method: "POST",
        body: email,
      }),
    }),
    confirmPassword: builder.mutation({
      query: (body) => {
        return {
          url:  getRoute('confirmPassword'),
          method: "POST",
          body: body,
        }
      },
    }),
    validatePassword: builder.mutation({
      query: (params) => {
        return {
          url: `/auth/validate/reset/${params?.uid}/${params?.token}`,
          method: "POST",      
        }
      },
    }),
    refreshToken: builder.mutation({
      query: ({body}) => ({
        url: getRoute("refreshToken"),
        method: "POST",
        body
      }),
    }),
  }),
});

interface AuthState {
  isAuthenticated: boolean;
  userName: string;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userName: "",
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      //localStorage.setItem("access", action.payload); // [UPDATED]
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const { setAuthenticated, setAccessToken, setUserName } =
  authSlice.actions;

// TODO authentication needs to be check
export const getAccessToken = createSelector(
  (state) => state.auth.accessToken,
  (accessToken) => {
    if (!accessToken) {
      return localStorage.getItem("access") || null;
    }
    return accessToken;
  }
);

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useConfirmPasswordMutation,
  useRefreshTokenMutation,
  useValidatePasswordMutation
} = loginApi;

export default authSlice.reducer;
