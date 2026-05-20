import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const checkSession = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('auth_token');
  if (!token) return rejectWithValue('No token');
  const res = await fetch(`${API_BASE}/auth/session`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return rejectWithValue('Invalid session');
  const data = await res.json();
  return data.user;
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) return rejectWithValue(data.error);
  localStorage.setItem('auth_token', data.session.access_token);
  return data.user;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const token = localStorage.getItem('auth_token');
  await fetch(`${API_BASE}/auth/signout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem('auth_token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: true, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => { state.loading = true; })
      .addCase(checkSession.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
      .addCase(checkSession.rejected, (state) => { state.user = null; state.loading = false; })
      .addCase(signIn.pending, (state) => { state.error = null; })
      .addCase(signIn.fulfilled, (state, action) => { state.user = action.payload; state.error = null; })
      .addCase(signIn.rejected, (state, action) => { state.error = action.payload; })
      .addCase(signOut.fulfilled, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;
