import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authUser",
  initialState: {
    authUser: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    getAuthUserStart: (state) => {
      state.authUser.isFetching = true;
      state.authUser.error = false;
    },
    getAuthUserSuccess: (state, action) => {
      state.authUser.currentUser = action.payload;
      state.authUser.isFetching = false;
      state.authUser.error = false;
    },
    getAuthUserFailed: (state) => {
      state.authUser.isFetching = false;
      state.authUser.error = true;
    },
  },
});

export const { getAuthUserStart, getAuthUserSuccess, getAuthUserFailed } =
  authSlice.actions;

export default authSlice.reducer;
