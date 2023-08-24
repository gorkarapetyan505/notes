import { createSlice } from "@reduxjs/toolkit";
import { Food } from "../food/foodSlice";
import { RootState } from "../../app/store";
import { addDietThunk, getAllDietThunk } from "./dietAPI";

export type Diet = { id: string; name: string; foods: Food[] };

const initialState: { diet_foods: Food[]; diets: Diet[] } = {
  diet_foods: [],
  diets: [],
};

const dietSlice = createSlice({
  name: "[diet]",
  initialState,
  reducers: {
    addDietFood: (state, action) => {
      state.diet_foods.push(action.payload);
    },
    deleteDietFood: (state: any, action) => {
      state.diet_foods = state.diet_foods.filter(
        (e: Food) => e.id != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDietThunk.fulfilled, (state: any, action) => {
      state.diets = action.payload;
    })
    .addCase(addDietThunk.fulfilled,(state:any,action)=>{
        state.diets.push(action.payload)
    })
  },
});
export const {addDietFood,deleteDietFood} = dietSlice.actions;
export const selectDiet = (state: RootState) => state.diet;
export default dietSlice.reducer;
