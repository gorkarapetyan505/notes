import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUserThunk,
  getloginUserThunk,
  getseeUserPostThunk,
  loginUserThunk,
  updateByIdUserThunk,
  updateUserPhotoThunk,
  updateUserThunk,
} from "./userAPI";
import { RootState } from "../../app/store";

export type User = {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
  photo: string;
  photoUrl: string;
  height: number;
  weight: number;
  status: string;
};

const initialState: { users: User[]; user_log: User } = {
  users: [],
  user_log: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state: any, action) => {
        state.user_log = action.payload;
      })
      .addCase(updateByIdUserThunk.fulfilled, (state: any, action) => {
        // state.user_log=action.payload
      })
      .addCase(getloginUserThunk.fulfilled, (state: any, action) => {
        state.user_log = action.payload;
      })
      .addCase(getAllUserThunk.fulfilled, (state: any, action) => {
        state.users = action.payload;
      })
      .addCase(updateUserPhotoThunk.fulfilled, (state, action) => {
        state.user_log.photo = action.payload.img.photo;
        state.user_log.photoUrl = action.payload.img.photoUrl;
      })
      .addCase(updateUserThunk.fulfilled, (state: any, action) => {
        state.user_log = { ...state.user_log, ...action.payload };
      });
  },
});
export const selectSUser = (state: RootState) => state.user; // app/store/reducer
export default userSlice.reducer;
