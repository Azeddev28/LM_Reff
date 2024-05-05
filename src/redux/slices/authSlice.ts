import { createSlice,  createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getRoute } from '../../api/backendRoutes';


export const  loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.6.94.153/api',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => (
        {
          url: '/auth/login/',
          method: 'POST',
          body: data,
        }
      ),
    }),
     

}),
})



// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await postRequest("http://3.6.94.153/api/auth/login/", credentials);
//       dispatch(setAuthenticated(true));
//       dispatch(setAccessToken(response.access));
//       localStorage.setItem('access', response.access);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
interface AuthState {
  isAuthenticated: boolean;
  userName:string;
  accessToken:string | null;

}

const initialState: AuthState = {
  isAuthenticated: false,
  userName:"",
  accessToken:null,
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setAccessToken(state,action){
      state.accessToken=action.payload;
    },
    setUserName(state,action){
       state.userName=action.payload;
    }
    
  },
  // extraReducers: (builder) => {
  //   builder.addCase(login.pending, (state) => {
  //     state.loading = 'pending';
  //     state.error = null;
  //   });
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.loading = 'idle';
  //     state.isAuthenticated = true;
  //   });
  //   builder.addCase(login.rejected, (state, action) => {
  //     state.loading = 'idle';
  //     state.error = action.payload as string;
  //   });
  // },
});

export const { setAuthenticated,setAccessToken,setUserName } = authSlice.actions;

// TODO authentication needs to be check
export const getAccessToken = createSelector(
  (state) => state.auth.accessToken,
  (accessToken) => {
    if (!accessToken) {
      return localStorage.getItem('access') || null;
    }
    return accessToken;
  }
);   


export const { useLoginMutation}=loginApi;

export default authSlice.reducer;


