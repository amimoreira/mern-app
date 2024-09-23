import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import expReducer from "../features/experience/expSlice";
import aboutReducer from "../features/about/aboutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exps: expReducer,
    abouts: aboutReducer

  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;