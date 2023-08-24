import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Diet } from "./dietSlice";
import { Food } from "../food/foodSlice";

const coll = collection(db, "diet");

export const addDietThunk = createAsyncThunk(
    "[add diet thunk]",
    async (data: {name:string,foods:any}) => {
      const res = await addDoc(coll, data);
      return { ...data, id: res.id };
    }
  );
  
  export const updateDietThunk = createAsyncThunk(
    "[update diet thunk]",
    async ({ id, data }: { id: string; data: any }) => {
      const res = await updateDoc(doc(coll, id), data);
      return { id, data };
    }
  );
  
  export const getAllDietThunk = createAsyncThunk(
    "[get all diet thunk]",
    async () => {
      const data = await getDocs(coll);
      return data.docs.map((e) => ({ ...e.data(), id: e.id }));
    }
  );
