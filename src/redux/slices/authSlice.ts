import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { postRequest } from '../../axios';
import { getRoute } from '../../api/backendRoutes';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await postRequest("http://3.6.94.153/api/auth/login/", credentials);
      dispatch(setAuthenticated(true));
      dispatch(setAccessToken(response.access));
      localStorage.setItem('access', response.access);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
interface AuthState {
  isAuthenticated: boolean;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
  accessToken:string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: 'idle',
  error: null,
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
    
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.payload as string;
    });
  },
});

export const { setAuthenticated,setAccessToken } = authSlice.actions;

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

export default authSlice.reducer;


