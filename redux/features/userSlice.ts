import { IUser } from "@/server/models/user.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setIsAuthenticated } = userSlice.actions;
