import { createSlice } from "@reduxjs/toolkit";
import {
  addTodayFoodThunk,
  deleteTodayFoodThunk,
  getTodayThunk,
  updateTodayThunk,
} from "./dayAPI";
import { RootState } from "../../app/store";
import { Food } from "../food/foodSlice";

export type Day = {
  id: string;
  userId: string;
  day: number;
  year: number;
  month: number;
  pushup: number; // jim
  crunch: number; // pres
  situp: number; // kqanis
  walking: number; // kaylel   // 16 metre 1 kaloria
  barpushup: number; // turnik,
  rope:number; // paran
  water:number; // jur
  foods: Food[];
  diet:string;
};

const initialState: { today: Day; day_data: any } = {
  today: {} as Day,
  day_data: {
    options: {
        colors: ["#E91E63", "#FF9800"],
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2010,2011,2012,2013],
        },
      },
      series: [
        {
          name: "People Born",
          data: [30, 40, 45, 500, 49, 60, 70, 91,54,65,76,32,54,43,54,98,56,90,45,76,98,69],
        },
        {
          name: "People Died",
          data: [3, 60, 35, 80, 49, 70, 20, 81,43,56,76,98,32,43,43,65,54,32,87,43,89,78],
        },
      ],
  },
};

const daySlice = createSlice({
  name: "[day]",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodayThunk.fulfilled, (state: any, action) => {
        state.today = action.payload;
      })
      .addCase(updateTodayThunk.fulfilled, (state: any, action) => {
        state.today = { ...state.today, ...action.payload };
      })
      .addCase(addTodayFoodThunk.fulfilled, (state: any, action) => {
        state.today = { ...state.today, ...action.payload };
      })
      .addCase(deleteTodayFoodThunk.fulfilled, (state: any, action) => {
        state.today = { ...state.today, ...action.payload };
      });
  },
});

export const selectDay = (state: RootState) => state.day;
export default daySlice.reducer;
