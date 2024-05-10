import { createSlice,  createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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


