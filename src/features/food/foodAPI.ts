import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Food } from "./foodSlice";
import { deleteObject, getStorage, ref } from "firebase/storage";

const coll = collection(db, "food");

export const addFoodThunk = createAsyncThunk(
  "[add food thunk]",
  async (data: Food) => {
    const res = await addDoc(coll, data);
    return { ...data, id: res.id };
  }
);

export const updateFoodThunk = createAsyncThunk(
  "[update food thunk]",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await updateDoc(doc(coll, id), data);
    return { id, data };
  }
);

export const getAllFoodThunk = createAsyncThunk(
  "[get all food thunk]",
  async () => {
    const data = await getDocs(coll);
    return data.docs.map((e) => ({ ...e.data(), id: e.id }));
  }
);

export const deleteFoodByIdThunk = createAsyncThunk(
  "[delete food by id Thunk]",
  async ({ id, url }: { id: string; url: any }) => {
    const d = await deleteDoc(doc(coll, id));
    if (url) {
      const storage = getStorage();
      const desertRef = ref(storage, url);
      deleteObject(desertRef)
        .then(() => {
          // console.log('delte')
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
    return id;
  }
);

// export const updateFoodByIdThunk = createAsyncThunk(
//     '[update food by id thunk]',
//     async ({id,data}:{id:string,data:Food})=>{
//          console.log(id,data)
//     }
// )

export const serachFoodThunk = createAsyncThunk(
  "[search food thunk]",
  async ({ food_name, category , sort}: any) => {
    if (food_name || category || sort) {
      const x = query(
        coll,
        where("food_name", ">=", food_name),
        where("food_name", "<=", food_name + "\uf8ff")
      );
      const data = await getDocs(x);
      let arr = data.docs.map((e) => ({ ...e.data(), id: e.id }));
      if(category){
        arr = arr.filter((e:any)=>e.category == category)
      }
      if(sort == '+'){
        arr = arr.sort((a:any,b:any)=>b.calorie_count - a.calorie_count)
      }
      if(sort == '-'){
        arr = arr.sort((a:any,b:any)=>a.calorie_count - b.calorie_count)
      }
      return arr;
    } else {
      const data = await getDocs(coll);
      return data.docs.map((e) => ({ ...e.data(), id: e.id }));
    }
  }
);

export const serachCategoryTrueThunk = createAsyncThunk(
  'dsfdf',
  async () =>{
    const data = await getDocs(coll);
    const s1 =data.docs.map((e) => ({ ...e.data(), id: e.id }));
    return s1.filter((e:any)=>!e.category)
  }
)