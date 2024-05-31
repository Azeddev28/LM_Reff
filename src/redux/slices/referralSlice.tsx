import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "./authSlice";
import { getRoute } from "../../api/BackendRoutes";
import { createBaseQueryWithReauth } from "../../utils/apiUtils";

const baseUrl = import.meta.env.VITE_URL;

export const referralApi = createApi({
  reducerPath: "referralApi",
  baseQuery:baseQueryWithReauth(baseUrl), 
  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: (url) => url,
    }),
    getClaims: builder.query({
      query: (url) => ({
        url: url,
      }),
    }),
    getEmployees: builder.query({
      query: (url) => url,
    }),
    getReferralDetail: builder.query({
      query: (id) => `referrals/detail/${id}`,
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: getRoute('resetPassword'),
        method: "POST",
        body: email,
      }),
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
    }),
    getProfile: builder.query({
      query: () => "/users/profile/",
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