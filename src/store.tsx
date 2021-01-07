import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import stateReducer from "./features/stateSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogState: stateReducer,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;