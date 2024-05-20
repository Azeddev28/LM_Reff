import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "./authSlice";
import { getRoute } from "../../api/BackendRoutes";

export const referralApi = createApi({
  reducerPath: "referralApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const accessToken = getAccessToken(getState());
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: (url) => url,
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),
    getClaims: builder.query({
      query: (url) => ({
        url: url,
      }),
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),
    getEmployees: builder.query({
      query: (url) => url,
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),
    getReferralDetail: builder.query({
      query: (id) => `referrals/detail/${id}`,
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: getRoute('resetPassword'),
        method: "POST",
        body: email,
      }),
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),

    updateReferral: builder.mutation({
      query: ({ id, data }) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          const value = data[key];
          if (Array.isArray(value)) {
            value.forEach((file, index) => {
              formData.append("attachments", file);
            });
          } else {
            formData.append(key, value);
          }
        });

        return {
          url: `/referrals/update/${id}/`,
          method: "PATCH",
          body: formData,
        };
      },
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),
    getProfile: builder.query({
      query: () => "/users/profile/",
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          window.location.href = getRoute('signIn');
        }
      },
    }),
  }),
});

export const {
  useGetReferralsQuery,
  useGetReferralDetailQuery,
  useGetClaimsQuery,
  useGetEmployeesQuery,
  useUpdateReferralMutation,
  useLazyGetReferralDetailQuery,
  useLazyGetProfileQuery,
  useGetProfileQuery,
} = referralApi;
