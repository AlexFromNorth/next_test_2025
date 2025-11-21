import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  registeredEmail: string | null;
  registeredPasswordHash: string | null;
  currentEmail: string | null;
  isAuthenticated: boolean;
  token: string | null; // новый токен
}

const initialState: AuthState = {
  registeredEmail: null,
  registeredPasswordHash: null,
  currentEmail: null,
  isAuthenticated: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<{ email: string; passwordHash: string }>) => {
      state.registeredEmail = action.payload.email;
      state.registeredPasswordHash = action.payload.passwordHash;
    },
    loginUser: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.isAuthenticated = true;
      state.currentEmail = action.payload.email;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentEmail = null;
      state.token = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
