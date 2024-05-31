import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRoute } from "../../api/BackendRoutes";
import { createBaseQueryWithReauth } from "../../utils/apiUtils";
import { getCookie, removeCookie, setCookie } from "../../utils/cookieManager";

const baseUrl = import.meta.env.VITE_URL;

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery:createBaseQueryWithReauth(baseUrl), // [UPDATED]
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
      query: (params) => {
        return {
          url:  `/auth/password/reset/confirm/${params?.uid}/${params?.token}/`, //TODO customize getRoute func to accept params
          method: "POST",
          body: params?.body,
        }
      },
    }),
    validatePassword: builder.mutation({
      query: (params) => {
        return {
          url: `/auth/validate/reset/${params?.uid}/${params?.token}/`,//TODO customize getRoute func to accept params
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
      state.isAuthenticated = true;
      state.accessToken = action.payload.access;
      setCookie("access", action.payload.access);
      if (action.payload && action.payload.refresh) {
        setCookie("refresh", action.payload.refresh);
      }
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    logoutUser(state) {
      console.log("logoutUser")
      state.accessToken = null;
      state.isAuthenticated = false;
      removeCookie('refresh')
      removeCookie('access')
    },
  },
});

export const { setAuthenticated, setAccessToken, setUserName, logoutUser } =
  authSlice.actions;

// TODO authentication needs to be check
export const getAccessToken = createSelector(
  (state) => state.auth.accessToken,
  (accessToken) => {
    if (!accessToken) {
      return  getCookie("access") || null
    }
    return accessToken;
  }
);

export const getRefreshToken = () => {
  return  getCookie("refresh") || null
};

export const {
  useLoginMutation,
  useResetPasswordMutation,
  useConfirmPasswordMutation,
  useRefreshTokenMutation,
  useValidatePasswordMutation
} = loginApi;

export default authSlice.reducer;
