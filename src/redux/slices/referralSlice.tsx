import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "./authSlice";
import { getRoute } from "../../api/BackendRoutes";
import { baseQueryWithReauth } from "../../utils/apiUtils";
import { createSlice } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_URL;

export const referralApi = createApi({
  reducerPath: "referralApi",
  baseQuery:baseQueryWithReauth(baseUrl), // [UPDATED]

  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: (url) => {
        return url;
      },
    }),
    getClaims: builder.query({
      query: (url) => {
        return url;
      },
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


interface ReferralState {
  page: number;
 
}
const initialState: ReferralState = {
  page: 1
  
};

const refferalSlice = createSlice({
  name: "refferal",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      console.log("currentpage", action.payload)
      state.page = action.payload;
    },
  },
});

export const { setCurrentPage } = refferalSlice.actions;



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

export default refferalSlice.reducer;
