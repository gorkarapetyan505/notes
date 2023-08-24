import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addFoodThunk, deleteFoodByIdThunk, getAllFoodThunk, serachCategoryTrueThunk, serachFoodThunk, updateFoodThunk } from "./foodAPI";
import { updateByIdUserThunk } from "../user/userAPI";

export type Food = {
  id: string;
  food_name: string;
  calorie_count: number;
  category:string;
  photo_url: string;
  photo_path: string;
};

const initialState: { foods: Food[] } = {
  foods: [],
};

const foodSlice = createSlice({
  name: "[food]",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFoodThunk.fulfilled, (state: any, action) => {
        state.foods = action.payload;
      }).addCase(addFoodThunk.fulfilled, (state: any, action) => {
        state.foods = [...state.foods, action.payload];
      })
      // .addCase(updateFoodThunk.fulfilled, (state: any, action) => {
      //   console.log(state);
      //   const index = state.foods.findIndex((e: Food) => e.id == action.payload?.id);
      //   if (index) {
          // state.foods[index] = { ...state.foods[index], ...action.payload.data };
      //   }
      //   console.log(state.foods);
      // })
      .addCase(deleteFoodByIdThunk.fulfilled,(state,action)=>{
        state.foods = state.foods.filter((e:Food)=>e.id!=action.payload)
      }).addCase(serachFoodThunk.fulfilled, (state: any, action) => {
        state.foods = action.payload;
      }).addCase(serachCategoryTrueThunk.fulfilled, (state: any, action) => {
        state.foods = action.payload;
      }).addCase(updateFoodThunk.fulfilled,(state:any,action)=>{
        // console.log(state.foods)
        const d = state.foods
        const index = state.foods.findIndex((e: Food) => e.id == action.payload?.id);
        if(index >= 0){
          state.foods[index] = { ...state.foods[index], ...action.payload.data };
        }
      })
  },
});

export const selectFood = (state: RootState) => state.food;
export default foodSlice.reducer;


export const FoodCategory = [
  'Basic','Meat','Vegetables','Fruits','Sweets','FastFood','Juice','Breads','Sous'
]