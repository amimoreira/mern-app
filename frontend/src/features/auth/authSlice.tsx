import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Función para registrar un usuario
export const register = createAsyncThunk(
  "auth/register",
  async (userData:{ userName: string; email: string; password: string }, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Función para iniciar sesión
export const login = createAsyncThunk(
  "auth/login",
  async (userData:{ email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Función para cerrar sesión
export const logout = createAsyncThunk('auth/logout',
async () => {
  await authService.logout();
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
    })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
