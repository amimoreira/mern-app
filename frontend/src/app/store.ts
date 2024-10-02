import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import expReducer from "../features/experience/expSlice";
import aboutReducer from "../features/about/aboutSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exps: expReducer,
    abouts: aboutReducer,
    contacts: contactReducer

  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;