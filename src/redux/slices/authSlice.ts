import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRoute } from "../../api/BackendRoutes";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
  }),
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
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = "/auth/sign-in";
        }
      },
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
      localStorage.setItem("access", action.payload);
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

export const { useLoginMutation, useResetPasswordMutation } = loginApi;

export default authSlice.reducer;
