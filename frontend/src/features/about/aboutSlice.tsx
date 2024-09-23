import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import aboutService from "./aboutService";
import { RootState } from "../../app/store";

interface About {
  _id: string;
  name: string;
  description: string;
  active: boolean;
}

const initialState: {
  abouts: About[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
} = {
  abouts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create about
export const createAbout = createAsyncThunk(
  "abouts/create",
  async (
    aboutData: { name: string; description: string, active: boolean },
    thunkAPI
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;

      return await aboutService.createAbout(aboutData, token);
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

// Get abouts
export const getAbouts = createAsyncThunk("abouts/getAll", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as RootState).auth.user.token;
    return await aboutService.getAbouts(token);
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

// Get about by id
export const getAbout = createAsyncThunk(
    "abouts/get",
    async (id: string, thunkAPI) => {
      try {
        const token = (thunkAPI.getState() as RootState).auth.user.token;
        return await aboutService.getAbout(id, token);
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

// Update about
export const updateAbout = createAsyncThunk(
    "abouts/update",
    async (
      aboutData: {
        id: string;
        name: string;
        description: string;
        active: boolean;    
      },
      thunkAPI
    ) => {
      try {
        const token = (thunkAPI.getState() as RootState).auth.user.token;
        return await aboutService.updateAbout(aboutData, token);
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

// Delete about
export const deleteAbout = createAsyncThunk(
    "abouts/delete",
    async (id: string, thunkAPI) => {
      try {
        const token = (thunkAPI.getState() as RootState).auth.user.token;
        return await aboutService.deleteAbout(id, token);
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

export const aboutSlice = createSlice({
  name: "abouts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAbout.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.abouts.push(action.payload);
      })
      .addCase(createAbout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAbouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbouts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.abouts = action.payload;
      })
      .addCase(getAbouts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbout.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.abouts = action.payload;
      })
      .addCase(getAbout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAbout.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.abouts.push(action.payload);
      })
      .addCase(updateAbout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAbout.pending, (state) => {
        state.isLoading = true;
      })    
      .addCase(deleteAbout.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.abouts = state.abouts.filter((about) => about._id !== action.payload.id);
      })
      .addCase(deleteAbout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = aboutSlice.actions;
export default aboutSlice.reducer;

