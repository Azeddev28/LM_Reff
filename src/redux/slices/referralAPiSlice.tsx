import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from './authSlice'; 

export const referralApi = createApi({
  reducerPath: 'referralApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.6.94.153/api',
    prepareHeaders: async (headers, { getState }) => {
      const accessToken = getAccessToken(getState());
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: (url) => url,
    }),
    getClaims: builder.query({
      query: (url) => url,
    }),
    getEmployees: builder.query({
      query: (url) => url,
    }),  
    getReferralDetail: builder.query({
      query: (id) => `referrals/detail/${id}`,
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/password/reset/',
        method: 'POST',
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
              formData.append('attachments', file);
            });
          } else {
            formData.append(key, value);
          }
        });
    
        return {
          url: `/referrals/update/${id}/`,
          method: 'PATCH',
          body: formData,
        };
      },
    }),

    getProfile: builder.query({
      query: () => "/users/profile/",
    }),  

}),
})


export const {
  useGetReferralsQuery,
  useGetReferralDetailQuery,
  useGetClaimsQuery,
  useGetEmployeesQuery,
  useUpdateReferralMutation,
  useLazyGetReferralDetailQuery,
  useResetPasswordMutation,
  useLazyGetProfileQuery,
} = referralApi;
