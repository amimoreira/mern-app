import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { RootState } from "../../app/store";

interface Contact {
  _id: string;
  name: string;
  lastName: string;
  phone: number;
  email: string;
}

const initialState: {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
} = {
  contacts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create contact
export const createContact = createAsyncThunk(
  "contacts/create",
  async (
    contactData: {
      name: string;
      lastName: string;
      phone: number;
      email: string;
    },
    thunkAPI
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;

      return await contactService.createContact(contactData, token);
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

// Get contact
export const getContacts = createAsyncThunk("contacts/getAll", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as RootState).auth.user.token;
    return await contactService.getContacts(token);
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
export const getContact = createAsyncThunk(
  "contacts/get",
  async (id: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await contactService.getContact(id, token);
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
export const updateContact = createAsyncThunk(
  "contacts/update",
  async (
    contactData: {
      id: string;
      name: string;
      lastName: string;
      phone: number;
      email: string;
    },
    thunkAPI
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await contactService.updateContact(contactData, token);
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
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await contactService.deleteContact(id, token);
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

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create contact
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts.push(action?.payload);
      })
      .addCase(createContact.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get contacts
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update contact
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts.push(action?.payload);
      })
      .addCase(updateContact.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get contact by id
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload.id);
      })
      .addCase(getContact.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;

export default contactSlice.reducer;
