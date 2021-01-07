import { createSlice } from "@reduxjs/toolkit";

interface BlogState {
  number: number;
}

let initialState = {
  number: 0,
};

export const stateSlice = createSlice({
  name: "blogState",
  initialState,
  reducers: {
    increment(state, { payload }: any) {
      state.number = payload;
    },
  },
});

export const { increment } = stateSlice.actions;
export const stateBlog = (state: any) => state.blogState;
export default stateSlice.reducer;