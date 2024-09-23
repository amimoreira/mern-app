import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import expService from "./expService";
import { RootState } from "../../app/store";

interface Exp {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

const initialState: {
  exps: Exp[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
} = {
  exps: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create experience
export const createExp = createAsyncThunk(
  "exps/create",
  async (
    expData: {
      company: string;
      position: string;
      description: string;
      startDate: Date;
      endDate: Date;
    },
    thunkAPI
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;

      return await expService.createExp(expData, token);
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

// Get experiences
export const getExps = createAsyncThunk("exps/getAll", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as RootState).auth.user.token;
    return await expService.getExps(token);
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Get experience by id
export const getExp = createAsyncThunk(
  "exps/get",
  async (id: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await expService.getExp(id, token);
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

// Update experience
export const updateExp = createAsyncThunk(
  "exps/update",
  async (
    expData: {
      id: string;
      company: string;
      position: string;
      description: string;
      startDate: Date;
      endDate: Date;
    },
    thunkAPI
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await expService.updateExp(expData, token);
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

// Delete experience
export const deleteExp = createAsyncThunk(
  "exps/delete",
  async (id: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await expService.deleteExp(id, token);
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

export const expSlice = createSlice({
  name: "exps",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create experience
      .addCase(createExp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exps.push(action?.payload);
      })
      .addCase(createExp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get experiences
      .addCase(getExps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExps.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exps = action.payload;
      })
      .addCase(getExps.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update experience
      .addCase(updateExp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exps.push(action?.payload);
      })
      .addCase(updateExp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete experience
      .addCase(deleteExp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exps = state.exps.filter((exp) => exp._id !== action.payload.id);
      })
      .addCase(deleteExp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get experience by id
      .addCase(getExp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exps = state.exps.filter((exp) => exp._id !== action.payload.id);
      })
      .addCase(getExp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = expSlice.actions;

export default expSlice.reducer;
