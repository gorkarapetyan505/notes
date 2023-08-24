import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Day } from "./daySlice";
import { Food } from "../food/foodSlice";

const coll = collection(db, "day");

export const getTodayThunk = createAsyncThunk(
  "[get Today Thunk]",
  async (id: string) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const x = query(
      coll,
      where("userId", "==", id),
      where("day", "==", day),
      where("month", "==", month),
      where("year", "==", year)
    );
    const data = await getDocs(x);
    const arr = data.docs.map((e) => ({ ...e.data(), id: e.id }));
    if (arr.length == 0) {
      // console.log(arr.length)
      const data = {
        userId: id,
        day,
        year,
        month,
        pushup: 0,
        crunch: 0,
        situp: 0,
        walking: 0,
        barpushup: 0,
        rope: 0,
        water: 0,
        foods: [],
        diet:""
      };
      const res = await addDoc(coll, data);
      return { ...data, id: res.id };
    } else {
      return { ...arr[0] };
    }
  }
);

export const updateTodayThunk = createAsyncThunk(
  "[update today thunk]",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await updateDoc(doc(coll, id), data);
    return data;
  }
);

export const addTodayFoodThunk = createAsyncThunk(
  "[add today food thunk]",
  async ({ today, food }: { today: Day; food: Food }) => {
    const data = [...today.foods, { ...food, id: Date.now() }];
    const res = await updateDoc(doc(coll, today.id), { foods: data });
    return { foods: data };
  }
);

export const deleteTodayFoodThunk = createAsyncThunk(
  "[delete today food thunk]",
  async ({ today, id }: { today: Day; id: string }) => {
    const data = [...today.foods.filter((e: Food) => e.id != id)];
    const res = await updateDoc(doc(coll, today.id), { foods: data });
    return { foods: data };
  }
);

export const searchDayThunk = createAsyncThunk(
  "[search day thunk]",
  async ({id, year ,month}: {id:string, year: number,month:number }) => {
    const x = query(
        coll,
        where("userId", "==", id),
        where("month", "==", +month),
        where("year", "==", +year)
      );
      console.log(+month,+year)
      // console.log(id,year,month)
      const data = await getDocs(x);
      const arr = data.docs.map((e) => ({ ...e.data(), id: e.id }));
      // console.log(arr)
      return arr
  }
);
