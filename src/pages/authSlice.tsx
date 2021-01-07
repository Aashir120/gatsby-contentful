import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'

interface initState {
  userEmail: string | null;
  token: string | null;
  isLoggedIn: boolean;
  number: number;
}

let initialState: initState = {
  userEmail: null,
  token: null,
  isLoggedIn: false,
  number: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuthenticated(state, { payload }) {
      console.log(payload);
      state.userEmail = payload.email;
      state.token = payload.token;
      state.isLoggedIn = payload.isAuth;
      state.number = payload.number;
      console.log(state.userEmail, state.token, state.isLoggedIn);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Succesfully!',
        showConfirmButton: false,
        timer: 1500
      })
    },
    blogShow(state, { payload }) {
      return {
        ...state,
        number: payload,
      };
    },
  },
});

export const { isAuthenticated, blogShow } = authSlice.actions;
export const userAuthentication = (state: any) => state.auth;
export default authSlice.reducer;