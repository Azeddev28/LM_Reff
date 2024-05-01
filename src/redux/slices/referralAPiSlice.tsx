import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const referralApi = createApi({
  reducerPath: 'referralApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://3.6.94.153/api' }),
  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: (url) => url,
    }),
    getClaims: builder.query({
        query: (url) => url,
      }),
    getReferralDetail: builder.query({
        query: (id) => `http://3.6.94.153/api/referrals/detail/${id}`,
      }),
  }),

})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetReferralsQuery ,useGetReferralDetailQuery,useGetClaimsQuery } = referralApi