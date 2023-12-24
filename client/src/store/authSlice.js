import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'

// First, create the thunk
export const fetchLogin = createAsyncThunk(
  'auth/fetchByIdStatus',
  async function ({username, password}, {rejectWithValue}) {
    try {
      const response = await fetch('http://localhost:4500/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify({
            username,
            password
        })
      })

      const data = await response.json();

      if (data.hash) {
        localStorage.setItem("hash", JSON.stringify(data.hash));
      }

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
)


const initialState = {
  user: null,
  status: null,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "resolve";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
  },
})


export default authSlice.reducer;
