import { getRoute } from "../../api/BackendRoutes";
import { getRequest } from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REFERRAL_ROWS_DATA } from "../../utils/constants";

export const fetchReferrals = createAsyncThunk(
  "data/fetchReferrals",
  async () => {
    return getRequest("http://3.6.94.153/api/referrals/");
  }
);

export const fetchClaims = createAsyncThunk("data/fetchClaims", async () => {
  return getRequest(getRoute("industriesList"));
});

export const fetchEmployerList = createAsyncThunk(
  "data/fetchEmployerList",
  async () => {
    return getRequest(getRoute("countriesList"));
  }
);

export const fetchReferralDetail = createAsyncThunk(
  "data/fetchReferralDetail",
  async (requestData) => {
    return getRequest(`http://3.6.94.153/api/referrals/detail/${requestData}`);
  }
);

// Define a data slice using createSlice
export const referralSlice = createSlice({
  name: "referral",
  initialState: {
    referralList: [],
    claims: [],
    employerList: [],
    referralDetail: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer for handling loading state when async actions start
    setLoading: (state) => {
      state.loading = true;
    },
    // Reducer for handling loading state when async actions complete successfully
    setLoadingFalse: (state) => {
      state.loading = false;
    },
    // Reducer for handling loading state when async actions encounter errors
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducers for updating state with fetched data
    setReferralList: (state, action) => {
      state.referralList = action.payload;
    },
    setClaims: (state, action) => {
      state.claims = action.payload;
    },
    setEmployerList: (state, action) => {
      state.employerList = action.payload;
    },
    setReferralDetail: (state, action) => {
      state.referralDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle actions for fetching companies
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.referralList = action.payload;
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle actions for fetching industries
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle actions for fetching countries
      .addCase(fetchEmployerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployerList.fulfilled, (state, action) => {
        state.loading = false;
        state.employerList = action.payload;
      })
      .addCase(fetchEmployerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle actions for fetching languages
      .addCase(fetchReferralDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReferralDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.referralDetail = action.payload;
      })
      .addCase(fetchReferralDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {
  setLoading,
  setLoadingFalse,
  setError,
  setReferralList,
  setClaims,
  setEmployerList,
  setReferralDetail,
} = referralSlice.actions;
export default referralSlice.reducer;
