import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from './authSlice'; // Importing the selector to retrieve the access token

// Define a service using a base URL and expected endpoints
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
    // updateReferral: builder.mutation({
    //   query: ({ id, data }) => {
    //     console.log("Data Mutatation:", data); // Add this line to console.log the data
    //     return {
    //       url: `/referrals/update/${id}/`,
    //       method: 'PATCH',
    //       body: data,
    //       formData: true,
    //     };
    //   },
    // }),
    // }),
     
    updateReferral: builder.mutation({
      query: ({ id, data }) => {
        console.log("Data Mutation:", data); // Log the data for debugging
        const formData = new FormData();
    
        // Iterate over the keys of the data object
        Object.keys(data).forEach((key) => {
          const value = data[key];
    
          // If the value is an array (like files), iterate over it and append each file
          if (Array.isArray(value)) {
            value.forEach((file, index) => {
              console.log("Fillllllllleeeeeeeee",file);
              formData.append(`${key}[${index}]`, file);
            });
          } else {
            // If it's not an array, append the value directly
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
    


    // updateReferral: builder.mutation({
    //   query: ({ id, data }) => ({

    //     url: `/referrals/update/${id}/`,
    //     method: 'PATCH',
    //     body: data,
    //     formData: true,
    //   }),
    // }),
  // }),
}),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetReferralsQuery,
  useGetReferralDetailQuery,
  useGetClaimsQuery,
  useGetEmployeesQuery,
  useUpdateReferralMutation,
  useLazyGetReferralDetailQuery,
  useResetPasswordMutation,
} = referralApi;
