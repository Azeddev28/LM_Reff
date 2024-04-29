import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../axios';
import { getRoute } from '../../api/backendRoutes';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await postRequest("http://3.6.94.153/api/auth/login/", credentials);
      dispatch(setAuthenticated(true));
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
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
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

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
