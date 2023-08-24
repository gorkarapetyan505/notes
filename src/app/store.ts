import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import dayReducer from '../features/day/daySlice'
import foodReducer from "../features/food/foodSlice"
import dietReducer from "../features/diet/dietSlice"

export const store = configureStore({
  reducer: {
    user:userReducer,
    day:dayReducer,
    food:foodReducer,
    diet:dietReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
